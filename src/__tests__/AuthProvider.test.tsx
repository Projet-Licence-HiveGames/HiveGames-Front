import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

import { AuthProvider, useAuth } from "../context/AuthContext";

// ✅ Mock de l'API privée (évite les vrais appels réseau)
vi.mock("../api/privateApi", () => ({
  privateApi: vi.fn((url: string) => {
    if (url === "/auth/user") {
      return Promise.resolve({
        user: {
          pseudo: "testuser",
          email: "user@test.com",
        },
      });
    }
    return Promise.resolve(true); // Pour login et logout
  }),
}));

// ✅ Composant de test utilisant le contexte
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user?.pseudo || "non connecté"}</div>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <button
        onClick={() =>
          login({
            pseudo: "testuser",
            email: "user@test.com",
            password: "pwd",
          })
        }
      >
        Se connecter
      </button>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("devrait initialiser avec un utilisateur non connecté", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId("user").textContent).toBe("non connecté");
    expect(screen.getByTestId("isAuthenticated").textContent).toBe("false");
  });

  it("devrait permettre la connexion", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => {
      expect(screen.getByTestId("user").textContent).toBe("testuser");
      expect(screen.getByTestId("isAuthenticated").textContent).toBe("true");
    });
  });

  it("devrait permettre la déconnexion", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() =>
      expect(screen.getByTestId("isAuthenticated").textContent).toBe("true"),
    );

    fireEvent.click(screen.getByText("Se déconnecter"));

    await waitFor(() => {
      expect(screen.getByTestId("user").textContent).toBe("non connecté");
      expect(screen.getByTestId("isAuthenticated").textContent).toBe("false");
    });
  });

  it("devrait persister l'état de connexion dans le localStorage", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => {
      const stored = localStorage.getItem("user");
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!).pseudo).toBe("testuser");
    });
  });

  it("doit passer isAuthenticated à true après la connexion", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByText("Se connecter"));

    await waitFor(() => {
      expect(screen.getByTestId("isAuthenticated").textContent).toBe("true");
    });
  });
});
