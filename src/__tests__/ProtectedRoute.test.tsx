import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/AuthProvider"; // Import du context directement

const TestComponent = () => <div data-testid="protected">Contenu protégé</div>;

// Créer un mock de AuthProvider en utilisant le Context.Provider
const MockAuthProvider = ({ children, isAuthenticated }) => {
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: jest.fn(), logout: jest.fn() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("devrait rediriger vers /Login si non authentifié", async () => {
    render(
      <MockAuthProvider isAuthenticated={false}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route path="/protected" element={<ProtectedRoute><TestComponent /></ProtectedRoute>} />
            <Route path="/login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Page de connexion")).toBeInTheDocument();
    });
  });

  it("devrait afficher le contenu si authentifié", async () => {
    render(
      <MockAuthProvider isAuthenticated={true}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route path="/protected" element={<ProtectedRoute><TestComponent /></ProtectedRoute>} />
            <Route path="/login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected")).toBeInTheDocument();
    });
  });
});
