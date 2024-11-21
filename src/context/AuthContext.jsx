import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Dummy user data
const DUMMY_USERS = [
  {
    email: 'demo@company.com',
    password: 'demo123',
    companyName: 'EcoTech Solutions',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (email, password, companyName) => {
    // In a real app, you would validate and send to an API
    const newUser = { email, password, companyName };
    DUMMY_USERS.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);