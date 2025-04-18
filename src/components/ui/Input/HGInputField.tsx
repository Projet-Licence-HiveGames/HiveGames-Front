import React from "react";
import { Input, InputAdornment } from "@mui/material";

import "./HGInputField.css";

interface InputProps {
  icon?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  step?: string | number;
  maxLength?: number;
}

const HGInputField: React.FC<InputProps> = ({
  icon,
  value,
  onChange,
  step,
  type,
  placeholder,
  maxLength,
}) => {
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && e.key === "e") {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      e.currentTarget.value = e.target.value.replace(",", ".");
      onChange(e);
    }
    if (type === "email") {
      e.currentTarget.value = e.target.value.replace(" ", "");
      onChange(e);
    }
  };

  return (
    <Input
      inputProps={{
        step: step,
        endadornment: (
          <InputAdornment position="end">
            <img src={icon} alt="icon" />
          </InputAdornment>
        ),
      }}
      type={type}
      value={value === "tel" ? `+33 ${value}` : value}
      onChange={onChange}
      onKeyDown={handleOnKeyDown}
      onInput={handleInput}
      placeholder={placeholder}
      maxRows={maxLength}
    />
  );
};

export default HGInputField;
