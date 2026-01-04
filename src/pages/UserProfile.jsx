// src/pages/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = () => {
  const { username } = useParams(); // In this app, we treat 'username' as the userId for simplicity
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const q = query(collection(db, "images"), where("userId", "==", username));
      const snapshot = await getDocs(q);
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchImages();
  }, [username]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Gallery</h1>
      <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.length > 0 ? images.map(img => (
          <div key={img.id} className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-lg">
            <img src={img.url} alt={img.title} className="w-full h-auto block" />
            <div className="p-2 bg-white">
              <p className="text-sm font-medium">{img.title}</p>
            </div>
          </div>
        )) : <p>No images found for this user.</p>}
      </div>
    </div>
  );
};

export default UserProfile;