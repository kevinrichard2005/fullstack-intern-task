import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Toaster position="top-right" />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/templates" replace />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/favorites" 
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/templates" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
