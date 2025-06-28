import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFetch } from "@api/privateApi.ts";

import { User } from "@customTypes/User.ts";

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

// The AuthProvide supplier
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const fetchApi = useFetch();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les informations utilisateur (par exemple, après un login)
  const checkUser = async () => {
    try {
      if (!localStorage.getItem("isAuthenticated")) {
        return;
      }
      setError(null);
      const userData = await fetchApi.get<{ user: User }>("/auth/user");
      setUser(userData.user);
    } catch (err) {
      localStorage.removeItem("isAuthenticated");
      setUser(null);
      setError("Utilisateur non trouvé ou non authentifié.");
    } finally {
      setLoading(false);
    }
  };

  // Function to create an account (e.g., send login information)
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

  // Function for logging in (e.g., sending log-in information)
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

  // Function to log out
  const logout = async () => {
    try {
      await fetchApi.post("/auth/logout");
      window.location.reload();
      localStorage.removeItem("isAuthenticated");
      setUser(null);
    } catch (err) {
      setError("Logout failed");
    }
  };

  useEffect(() => {
    checkUser();
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
