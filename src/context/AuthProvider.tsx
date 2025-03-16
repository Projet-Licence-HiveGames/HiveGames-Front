import React, {createContext, useContext, useState, useEffect} from "react";
import {privateApi} from "../api/privateApi.ts";

// Définir le type pour les données utilisateur (à adapter selon vos besoins)
interface User {
    user: {};
    name: string,
    email: string,
    user_role: string
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

// Le fournisseur AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fonction pour récupérer les informations utilisateur (par exemple, après un login)
    const checkUser = async () => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const userData = await privateApi<{ user: User }>('/auth/user', 'GET');
            setUser(userData.user);
            setIsAuthenticated(true); // Si l'utilisateur est récupéré, il est authentifié
        } catch (err) {
            setUser(null); // Si une erreur survient, il n'y a pas d'utilisateur connecté
            setIsAuthenticated(false);
            setError('Utilisateur non trouvé ou non authentifié.');
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour se connecter (par exemple, envoyer les informations de connexion)
    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            // Ici, vous devez appeler une API de connexion et obtenir le token ou la session
            const valide = await privateApi('/auth/login', 'POST', {email, password});
            if (valide) {
                localStorage.setItem("isAuthenticated", "true");
                await checkUser();
            }
        } catch (err) {
            setError('Échec de la connexion.');
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour se déconnecter
    const logout = async () => {
        try {
            // Appel à l'API pour supprimer le token de session
            await privateApi('/auth/logout', 'GET');
            localStorage.removeItem("isAuthenticated");
            setUser(null);
            setIsAuthenticated(false);
            // Vous pouvez également nettoyer des cookies ou le stockage local si nécessaire
            console.log('Logged out successfully');
        } catch (err) {
            console.error('Logout error:', err);
            setError('Logout failed');
        }
    };

    useEffect(() => {
        checkUser(); // Lors du montage du composant, vérifier si l'utilisateur est déjà connecté
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, error, login, logout, checkUser, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pour utiliser le AuthContext dans vos composants
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
