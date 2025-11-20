import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthProvider, AuthContext } from './context/AuthContext.jsx';

import ToastProvider from './components/ToastProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import Savings from './pages/Savings';

// PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/apply-loan"
            element={
              <ProtectedRoute>
                <ApplyLoan />
              </ProtectedRoute>
            }
          />

          <Route
            path="/savings"
            element={
              <ProtectedRoute>
                <Savings />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
