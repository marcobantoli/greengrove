import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null
  );
  const navigate = useNavigate();

  const login = (token, expiresIn) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('expiresIn', Date.now() + expiresIn);
    navigate('/');
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiresIn');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and should be a valid React node
};

export { AuthContext, AuthProvider };
