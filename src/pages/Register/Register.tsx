import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthProvider";
import * as yup from "yup";
import HGInputField from "../../components/ui/Input/HGInputField.tsx";
import { UserForm } from "../../types/User.ts";

type UserErrorsMsg = Partial<UserForm>;

const Register: React.FC = () => {
    // On extrait une seule fois les valeurs de useAuth
    const auth = useAuth();
    const { register, logout, isAuthenticated, user, loading, error } = auth;

    const [errors, setErrors] = useState<UserErrorsMsg>({});
    const [formData, setFormData] = useState<UserForm>({
        pseudo: "",
        email: "",
        password: "",
    });

    // Validation schema avec Yup (mémorisé pour éviter les recréations)
    const schema = useMemo(() => yup.object().shape({
        pseudo: yup
            .string()
            .required("Veuillez indiquer un pseudo"),
        email: yup
            .string()
            .email("Veuillez indiquer un mail valide")
            .required("Veuillez indiquer un email"),
        password: yup
            .string()
            .typeError("Veuillez indiquer un mot de passe")
            .min(8, "Veuillez indiquer un mot de passe avec minimum 12 caractères")
            .required("Veuillez indiquer un mot de passe"),
    }), []);

    // Fonction de validation du formulaire
    const validateForm = async (): Promise<boolean> => {
        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationError: unknown) {
            const newErrors: UserErrorsMsg = {};
            if (validationError instanceof yup.ValidationError) {
                validationError.inner.forEach((err: any) => {
                    newErrors[err.path as keyof UserErrorsMsg] = err.message;
                });
            }
            setErrors(newErrors);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            await register(formData.pseudo, formData.email, formData.password);
        }
    };

    // Si l'utilisateur est déjà authentifié, on affiche le message de bienvenue
    if (isAuthenticated) {
        return (
            <div>
                <h2>Bienvenue, {user?.pseudo}</h2>
                <button onClick={logout}>Se déconnecter</button>
            </div>
        );
    }

    // Formulaire d'inscription
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors.pseudo && <p style={{ color: "red" }}>{errors.pseudo}</p>}
                    <HGInputField
                        type="text"
                        placeholder="Pseudo"
                        value={formData.pseudo}
                        onChange={(e) =>
                            setFormData({ ...formData, pseudo: e.target.value })
                        }
                    />
                </div>
                <div>
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <HGInputField
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                </div>
                <div>
                    {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                    <HGInputField
                        type="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Register;
