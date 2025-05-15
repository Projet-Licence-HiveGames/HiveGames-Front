import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/AuthProvider";

// Composant de test protégé
const TestComponent = () => <div data-testid="protected">Contenu protégé</div>;

// Fournisseur de contexte mock
const MockAuthProvider: React.FC<{
  children: React.ReactNode;
  isAuthenticated?: boolean;
}> = ({ children, isAuthenticated = false }) => {
  const mockContextValue = {
    user: isAuthenticated
      ? {
          id: 1,
          email: "test@example.com",
          user: "testuser",
          pseudo: "Test",
          user_tag: "test#1234",
          user_role: "admin",
        }
      : null,
    loading: false,
    error: null,
    isAuthenticated,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    checkUser: vi.fn(),
  };

  return (
    <AuthContext.Provider value={mockContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

describe("ProtectedRoute", () => {
  it("affiche le contenu si l'utilisateur est authentifié", async () => {
    render(
      <MockAuthProvider isAuthenticated={true}>
        <MemoryRouter
          initialEntries={["/protected"]}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("protected")).toBeInTheDocument();
    });
  });

  it("redirige vers /login si l'utilisateur n'est pas authentifié", async () => {
    render(
      <MockAuthProvider isAuthenticated={false}>
        <MemoryRouter
          initialEntries={["/protected"]}
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Page de connexion</div>} />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Page de connexion")).toBeInTheDocument();
    });
  });
});
