import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import HGInputField from "../../components/ui/Input/HGInputField.tsx";
import { TLabel, TText } from "../../components/ui/TranslationLabel/TLabel.tsx";
import { useAuth } from "../../context/AuthProvider";
import { UserForm } from "../../types/User.ts";

import "./Register.css";

type UserErrorsMsg = Partial<UserForm>;

export const Register: React.FC = () => {
  const auth = useAuth();
  const { register, isAuthenticated, loading, error } = auth;

  const [errors, setErrors] = useState<UserErrorsMsg>({});
  const [formData, setFormData] = useState<UserForm>({
    pseudo: "",
    email: "",
    password: "",
  });

  // Validate schema with Yup (saved to avoid recreation)
  const schema = useMemo(
    () =>
      yup.object().shape({
        pseudo: yup.string().required("Veuillez indiquer un pseudo"),
        email: yup
          .string()
          .email("Veuillez indiquer un mail valide")
          .required("Veuillez indiquer un email"),
        password: yup
          .string()
          .typeError("Veuillez indiquer un mot de passe")
          .min(
            8,
            "Veuillez indiquer un mot de passe avec minimum 12 caractères",
          )
          .required("Veuillez indiquer un mot de passe"),
      }),
    [],
  );

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

  return (
    <div className="register-container">
      {!isAuthenticated && (
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-title">Inscription</h1>
          <div className="register-input-container">
            <HGInputField
              type="text"
              placeholder="Pseudo"
              value={formData.pseudo}
              onChange={(e) =>
                setFormData({ ...formData, pseudo: e.target.value })
              }
            />
            {errors.pseudo && <p className="register-error">{errors.pseudo}</p>}
          </div>
          <div className="register-input-container">
            <HGInputField
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p className="register-error">{errors.email}</p>}
          </div>
          <div className="register-input-container">
            <HGInputField
              type="password"
              placeholder={TText({ label: "password" })}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="register-error">{errors.password}</p>
            )}
          </div>
          <button className="register-button" type="submit" disabled={loading}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
          <div className="register-links">
            <Link to="/login">
              <TLabel label={"login.footer.already_got_account"} />
            </Link>
          </div>

          {error && <p className="register-error">{error}</p>}
        </form>
      )}
    </div>
  );
};
