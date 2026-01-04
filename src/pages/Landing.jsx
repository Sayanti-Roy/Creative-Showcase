// src/pages/Landing.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Define Dummy Data Generator
  const generateDummyImages = () => {
    return Array.from({ length: 12 }).map((_, index) => ({
      id: `dummy-${index}`,
      url: `https://picsum.photos/400/${300 + (index * 20)}`, // Fixed height variation
      title: `Inspiration #${index + 1}`,
      userEmail: "demo@creative.com",
      isReal: false
    }));
  };

  useEffect(() => {
    const fetchImages = async () => {
      let realImages = [];
      try {
        // 2. Fetch Real Uploads from Firebase
        const q = query(collection(db, "images"), orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        
        realImages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          isReal: true,
          ...doc.data()
        }));
      } catch (error) {
        console.error("Error fetching real images (likely index issue):", error);
        // Even if Firebase fails, we continue so we can at least show dummy images
      }

      // 3. COMBINE THEM: Real Images + Dummy Images
      const combinedImages = [...realImages, ...generateDummyImages()];
      setImages(combinedImages);
      setLoading(false);
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Explore Digital Memories
        </h1>
        <p className="text-gray-600">
          Community uploads & daily inspiration
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading gallery...</p>
      ) : (
        /* MASONRY LAYOUT */
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img) => (
            <div key={img.id} className="break-inside-avoid mb-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
              
              <div className="p-3">
                <p className="font-semibold text-gray-800 text-sm truncate">{img.title}</p>
                
                {/* Logic to show 'Curated' for dummy images vs 'User Link' for real ones */}
                {img.isReal ? (
                  <Link to={`/profile/${img.userId}`} className="text-xs text-blue-500 hover:underline block mt-1">
                    by {img.userEmail?.split('@')[0]}
                  </Link>
                ) : (
                  <span className="text-xs text-gray-400 block mt-1">Curated Selection</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Landing;