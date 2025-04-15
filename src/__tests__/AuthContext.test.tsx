import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Composant de test pour accéder au contexte
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="user">{user?.pseudo || 'non connecté'}</div>
      <div data-testid="isAuthenticated">{isAuthenticated.toString()}</div>
      <button onClick={() => login({pseudo: 'testuser', email: 'test@test.com', password: 'testuser'})}>
        Se connecter
      </button>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('devrait initialiser avec un utilisateur non connecté', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user').textContent).toBe('non connecté');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
  });

  it('devrait permettre la connexion', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Se connecter'));
    expect(screen.getByTestId('user').textContent).toBe('testuser');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('true');
  });

  it('devrait permettre la déconnexion', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Se connecter'));
    fireEvent.click(screen.getByText('Se déconnecter'));
    expect(screen.getByTestId('user').textContent).toBe('non connecté');
    expect(screen.getByTestId('isAuthenticated').textContent).toBe('false');
  });

  it('devrait persister l\'état de connexion dans le localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Se connecter'));
    const storedUser = localStorage.getItem('user');
    expect(storedUser).toBeTruthy();
    expect(JSON.parse(storedUser!).username).toBe('testuser');
  });
}); 