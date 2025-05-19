import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useFetch } from "../api/privateApi.ts";
import { User } from "../types/User.ts";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkUser: () => void;
  isAuthenticated: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  checkUser: () => {},
  isAuthenticated: false,
});

// Le fournisseur AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const fetchApi = useFetch();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les informations utilisateur (par exemple, après un login)
  const checkUser = async () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await fetchApi.get<{ user: User }>("/auth/user");
      setUser(userData.user);
      setIsAuthenticated(true); // Si l'utilisateur est récupéré, il est authentifié
    } catch (err) {
      localStorage.removeItem("isAuthenticated");
      setUser(null); // Si une erreur survient, il n'y a pas d'utilisateur connecté
      setIsAuthenticated(false);
      setError("Utilisateur non trouvé ou non authentifié.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour se créer un compte (par exemple, envoyer les informations de connexion)
  const register = async (pseudo: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Ici, vous devez appeler une API de connexion et obtenir le token ou la session
      const valide = await fetchApi.post("/auth/register", {
        pseudo,
        email,
        password,
      });
      if (valide) {
        localStorage.setItem("isAuthenticated", "true");
        await checkUser();
      }
    } catch (err) {
      setError("Échec de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour se connecter (par exemple, envoyer les informations de connexion)
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Ici, vous devez appeler une API de connexion et obtenir le token ou la session
      const valide = await fetchApi.post("/auth/login", {
        email,
        password,
      });
      if (valide) {
        localStorage.setItem("isAuthenticated", "true");
        await checkUser();
      }
    } catch (err) {
      setError("Échec de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour se déconnecter
  const logout = async () => {
    try {
      // Appel à l'API pour supprimer le token de session
      await fetchApi.post("/auth/logout");
      localStorage.removeItem("isAuthenticated");
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError("Logout failed");
    }
  };

  useEffect(() => {
    checkUser(); // Lors du montage du composant, vérifier si l'utilisateur est déjà connecté
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      register,
      login,
      logout,
      checkUser,
      isAuthenticated,
    }),
    [user, loading, error, isAuthenticated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
