"use client";

import { useState, useEffect } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  type?: string;
}

export default function InputField({
  value,
  onChange,
  showPassword = false,
  type = "text",
  className = "",
  disabled,
  ...props
}: InputFieldProps) {
  const [hasContent, setHasContent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setHasContent(value.length > 0);
  }, [value]);

  const baseClasses =
    "w-full pl-3 pr-12 py-3 border rounded-xl transition-all duration-300";

  const getStateClasses = () => {
    if (disabled) return "border-gray-200 bg-gray-50";

    if (isFocused) {
      return "border-primary-500 shadow-xl shadow-primary-200/30 bg-white";
    }

    return "border-gray-300 hover:border-gray-400 bg-white";
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`${baseClasses} ${getStateClasses()} focus:outline-none ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
