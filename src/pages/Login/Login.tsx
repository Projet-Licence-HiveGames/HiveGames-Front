import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

import HGInputField from "../../components/ui/Input/HGInputField.tsx";
import { useAuth } from "../../context/AuthProvider";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const { login, logout, isAuthenticated, user, loading, error } = useAuth();
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
    <div>
      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
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
          <h2>Welcome, {user?.pseudo}</h2>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
