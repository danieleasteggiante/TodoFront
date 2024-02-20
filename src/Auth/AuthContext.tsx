import React, { createContext, useContext, useState } from 'react';

// Definizione del tipo per il contesto di autenticazione
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Creazione del contesto di autenticazione
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

// Hook personalizzato per accedere al contesto di autenticazione
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children : React.ReactNode;
}

// Provider di contesto di autenticazione
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};