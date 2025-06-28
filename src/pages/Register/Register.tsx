import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { useAuth } from "@contexts/AuthProvider";
import { UserForm } from "@customTypes/User.ts";

import HGInputField from "@components/ui/Input/HGInputField.tsx";
import { TLabel, TText } from "@components/ui/TranslationLabel/TLabel.tsx";

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
              onChange={(e) =>
                setFormData({ ...formData, pseudo: e.target.value })
              }
              placeholder="Pseudo"
              type="text"
              value={formData.pseudo}
            />
            {errors.pseudo && <p className="register-error">{errors.pseudo}</p>}
          </div>
          <div className="register-input-container">
            <HGInputField
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              type="email"
              value={formData.email}
            />
            {errors.email && <p className="register-error">{errors.email}</p>}
          </div>
          <div className="register-input-container">
            <HGInputField
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={TText({ label: "password" })}
              type="password"
              value={formData.password}
            />
            {errors.password && (
              <p className="register-error">{errors.password}</p>
            )}
          </div>
          <button className="register-button" disabled={loading} type="submit">
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
