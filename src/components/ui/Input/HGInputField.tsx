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
            <img alt="icon" src={icon} />
          </InputAdornment>
        ),
      }}
      maxRows={maxLength}
      onChange={onChange}
      onInput={handleInput}
      onKeyDown={handleOnKeyDown}
      placeholder={placeholder}
      type={type}
      value={value === "tel" ? `+33 ${value}` : value}
    />
  );
};

export default HGInputField;
