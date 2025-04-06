import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import * as yup from "yup";
import HGInputField from "../../components/ui/Input/HGInputField.tsx";

interface FormData {
    email: string;
    password: string;
}

interface Errors {
    email?: string;
    password?: string;
}

const Login: React.FC = () => {
    const { login, logout, isAuthenticated, user, loading, error } = useAuth();
    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    // Validation schema with Yup
    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Veuillez indiquer un mail valide")
            .required("Veuillez indiquer un email"),
        password: yup
            .string()
            .typeError("Veuillez indiquer un mot de passe")
            .min(8, "Veuillez indiquer un mot de passe avec minimum 12 caractères")
            .required("Veuillez indiquer un mot de passe"),
    });

    // Form validation function
    const validateForm = async (): Promise<boolean> => {
        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear errors if validation is successful
            return true;
        } catch (validationError: yup.ValidationError) {
            const newErrors: Errors = {};
            validationError.inner.forEach((err: any) => {
                newErrors[err.path as keyof Errors] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            await login(formData.email, formData.password);
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                        <HGInputField
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <HGInputField
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        {errors.password && (
                            <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                    </div>

                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <h2>Welcome, {user?.name}</h2>
                    <button onClick={logout}>Logout</button>
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
