import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, logout, isAuthenticated, user, loading, error } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <h2>Welcome, {user?.name}</h2>
                    <button onClick={logout}>Logout</button>
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
