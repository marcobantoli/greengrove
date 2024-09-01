import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null
  );

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and should be a valid React node
};

export { AuthContext, AuthProvider };
