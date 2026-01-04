// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null); 
  const [uploading, setUploading] = useState(false); 
  const [myImages, setMyImages] = useState([]);
  const navigate = useNavigate();

  // ==========================================
  // CONFIGURATION (Fill these in!)
  // ==========================================
  const CLOUD_NAME = "dg7kgvg3i"; 
  const UPLOAD_PRESET = "react_upload"; 
  // ==========================================

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserImages(currentUser.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchUserImages = async (uid) => {
    const q = query(collection(db, "images"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const imgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMyImages(imgs);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) return;

    setUploading(true);

    try {
      // 1. Upload to Cloudinary via REST API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET); 

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // 2. Save the Cloudinary URL to Firebase Firestore
      await addDoc(collection(db, "images"), {
        title: title,
        url: data.secure_url, // URL from Cloudinary
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date()
      });

      // Reset form
      setTitle('');
      setFile(null);
      document.getElementById('fileInput').value = ''; 
      
      fetchUserImages(user.uid);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed! Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload New Memory</h3>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Image Title" 
            className="border p-2 rounded flex-1"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
          
          <input 
            id="fileInput"
            type="file" 
            accept="image/*"
            className="border p-2 rounded flex-1 bg-gray-50"
            onChange={(e) => setFile(e.target.files[0])} 
            required
          />

          <button 
            disabled={uploading}
            className={`px-6 py-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      <h3 className="text-xl font-semibold mb-4">My Uploads</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {myImages.map(img => (
          <div key={img.id} className="border rounded overflow-hidden shadow">
            <img src={img.url} alt={img.title} className="w-full h-48 object-cover" />
            <div className="p-2">
              <p className="font-medium">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;