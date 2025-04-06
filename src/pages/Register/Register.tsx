import React, { useState, useMemo } from "react";
import { useAuth } from "../../context/AuthProvider";
import * as yup from "yup";
import HGInputField from "../../components/ui/Input/HGInputField.tsx";

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface Errors {
    name?: string;
    email?: string;
    password?: string;
}

const Register: React.FC = () => {
    // On extrait une seule fois les valeurs de useAuth
    const auth = useAuth();
    const { register, logout, isAuthenticated, user, loading, error } = auth;

    const [errors, setErrors] = useState<Errors>({});
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    // Validation schema avec Yup (mémorisé pour éviter les recréations)
    const schema = useMemo(() => yup.object().shape({
        name: yup
            .string()
            .required("Veuillez indiquer un nom"),
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
            const newErrors: Errors = {};
            if (validationError instanceof yup.ValidationError) {
                validationError.inner.forEach((err: any) => {
                    newErrors[err.path as keyof Errors] = err.message;
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
            await register(formData.name, formData.email, formData.password);
        }
    };

    // Si l'utilisateur est déjà authentifié, on affiche le message de bienvenue
    if (isAuthenticated) {
        return (
            <div>
                <h2>Bienvenue, {user?.name}</h2>
                <button onClick={logout}>Se déconnecter</button>
            </div>
        );
    }

    // Formulaire d'inscription
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Champ Nom */}
                <div>
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    <HGInputField
                        type="text"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                </div>

                {/* Champ Email */}
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

                {/* Champ Mot de passe */}
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
