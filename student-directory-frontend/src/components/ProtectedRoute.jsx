import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); //[cite: 2]

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; //[cite: 2]
  }

  return children; //[cite: 2]
}