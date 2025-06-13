import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'school' | 'teacher' | 'parent';
  schoolId?: string;
  schoolType?: 'public' | 'private';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('schoolManagementUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in production, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: role === 'school' ? 'École Primaire El-Hikmah' : 
            role === 'teacher' ? 'Ahmed Benaissa' : 'Fatima Bourahla',
      email,
      role: role as 'school' | 'teacher' | 'parent',
      schoolId: role !== 'school' ? 'school-1' : undefined,
      schoolType: role === 'school' ? 'private' : undefined
    };

    setUser(mockUser);
    localStorage.setItem('schoolManagementUser', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      schoolId: userData.schoolId,
      schoolType: userData.schoolType
    };

    setUser(newUser);
    localStorage.setItem('schoolManagementUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolManagementUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};