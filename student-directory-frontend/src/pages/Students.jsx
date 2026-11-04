import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students', { //
          headers: {
            'Authorization': `Bearer ${token}`, //[cite: 2]
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        
        // Handles both plain array [...] and wrapped object like { students: [...] } or { data: [...] }
        const studentList = Array.isArray(data) 
          ? data 
          : (data.students || data.data || []);

        setStudents(studentList);
      } catch (err) {
        setError(err.message || 'Error fetching data'); //[cite: 2]
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', color: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Students List</h2>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '0.5rem 1rem', 
            cursor: 'pointer',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button>
      </div>

      {loading && <div className="loading-state">Loading students...</div>} {/*[cite: 2] */}
      {error && <div className="error-message" style={{ color: '#ff6b6b' }}>{error}</div>} {/*[cite: 2] */}

      {!loading && !error && students.length === 0 && (
        <p style={{ color: '#aaa' }}>No students found in the database.</p>
      )}

      {!loading && !error && students.length > 0 && (
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
          {students.map((student, index) => (
            <li key={student.id || student._id || index} style={{ margin: '0.5rem 0' }}>
              <strong>{student.name || student.username || 'Unnamed'}</strong> ({student.email}) {/*[cite: 2] */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}