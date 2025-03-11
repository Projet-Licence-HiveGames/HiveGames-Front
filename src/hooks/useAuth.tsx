import { useState, useEffect } from 'react';
import { privateApi } from "../api/privateApi";

interface User {
    id: number;
    name: string;
    email: string;
    user_role: string;
}

interface AuthResponse {
    user: User;
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null); // Préciser le type pour user

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Utilisation de privateApi pour obtenir les informations de l'utilisateur
                const response = await privateApi<AuthResponse>('/auth/user', 'GET');
                console.log(response)
                setIsAuthenticated(true);
                setUser(response.user); // Stocker l'utilisateur dans le state
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        checkAuthStatus();
    }, []); // Se déclenche une seule fois au montage du composant

    return { isAuthenticated, user };
};

export default useAuth;