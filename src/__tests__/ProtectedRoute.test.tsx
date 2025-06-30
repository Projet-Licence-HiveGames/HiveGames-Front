import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";

import { AuthContext } from "@contexts/AuthProvider";

import ProtectedRoute from "@components/ProtectedRoute";

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
          avatar_path: null,
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
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
          initialEntries={["/protected"]}
        >
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
              path="/protected"
            />
            <Route element={<div>Page de connexion</div>} path="/login" />
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
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
          initialEntries={["/protected"]}
        >
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <TestComponent />
                </ProtectedRoute>
              }
              path="/protected"
            />
            <Route element={<div>Page de connexion</div>} path="/login" />
          </Routes>
        </MemoryRouter>
      </MockAuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Page de connexion")).toBeInTheDocument();
    });
  });
});
