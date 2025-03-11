import React, {useState} from 'react';
import {privateApi} from '../../api/privateApi.ts';
import useAuth from "../../hooks/useAuth.tsx";

interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const {isAuthenticated, user} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await privateApi<LoginData>(
                '/auth/login',
                'POST',
                formData,
            );
            useAuth();
            console.log('Login success:', response);
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid username or password.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Username</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    {loading ? <p>Loading...</p> : <button type='submit'>Login</button>}
                </div>

                {isAuthenticated ? (
                    <div>
                        <p>Welcome, {user?.name}</p>
                        {/* Vous pouvez ajouter ici un bouton de déconnexion */}
                    </div>
                ) : (
                    <p>Please log in</p>
                )}

                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
