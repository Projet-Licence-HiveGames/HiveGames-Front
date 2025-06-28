import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useAuth } from "@contexts/AuthProvider";

import HGInputField from "@components/ui/Input/HGInputField.tsx";
import { Loader } from "@components/ui/Loader/Loader.tsx";
import { TLabel, TText } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./Login.css";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
      .required("Veuillez indiquer un mot de passe"),
  });

  // Form validation function
  const validateForm = async (): Promise<boolean> => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear errors if validation is successful
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      try {
        await login(formData.email, formData.password);
        navigate(location.state?.from?.pathname || "/", { replace: true });
      } catch (loginError) {
        setErrors({ ...errors, password: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div className="login-container">
      {!isAuthenticated && (
        <form className="login-form" onSubmit={handleLogin}>
          <TLabel baliseType={"h1"} className={"login-title"} label={"login"} />
          <div className="login-input-container">
            <HGInputField
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              type="email"
              value={formData.email}
            />
            {errors.email && <p className="login-error">{errors.email}</p>}
          </div>
          <div className="login-input-container">
            <HGInputField
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder={TText({ label: "password" })}
              type="password"
              value={formData.password}
            />
            {errors.password && (
              <p className="login-error">{errors.password}</p>
            )}
          </div>
          <button className="login-button" disabled={loading} type="submit">
            {loading ? <Loader /> : <TLabel label={"login"} />}
          </button>
          <div className="login-links">
            <Link to="/register">
              <TLabel label={"login.footer.still_not_registered"} />
            </Link>
          </div>
          {error && <p className="login-error">{error}</p>}
        </form>
      )}
    </div>
  );
};
