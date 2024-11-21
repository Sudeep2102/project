import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Reports from './pages/Reports'; // Import Reports page
import AIChat from './components/AIChat';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    <Navbar />
                    <Analytics />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/reports"
                element={
                  <>
                    <Navbar />
                    <Reports />
                  </>
                }
              />
            </Route>
          </Routes>
          
          {/* AI Chat Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
          
          {/* AI Chat Modal */}
          {isChatOpen && <AIChat onClose={() => setIsChatOpen(false)} />}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
