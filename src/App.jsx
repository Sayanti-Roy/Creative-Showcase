import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Placeholder pages - we will create these files next
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar /> {/* Navigation bar visible on all pages */}
        <div className="p-4">
          <Routes>
            {/* 1. Landing Page: Random mosaic of images */}
            <Route path="/" element={<Landing />} />

            {/* 2 & 3. Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 4. User Profile: Private dashboard for uploading */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* 5. Public Page: Specific user's gallery */}
            <Route path="/profile/:username" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;