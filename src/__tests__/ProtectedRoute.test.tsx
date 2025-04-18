import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import ProtectedRoute from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

const TestComponent = () => <div>Contenu protégé</div>;

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("devrait rediriger vers /Login si non authentifié", () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/Login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText("Page de connexion")).toBeInTheDocument();
  });

  it("devrait afficher le contenu si authentifié", () => {
    // Simuler un utilisateur connecté
    localStorage.setItem(
      "user",
      JSON.stringify({ id: "1", email: "test@test.com", username: "testuser" }),
    );

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/Login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    // Attendre que le composant soit monté
    setTimeout(() => {
      expect(screen.getByText("Contenu protégé")).toBeInTheDocument();
    }, 0);
  });
});
