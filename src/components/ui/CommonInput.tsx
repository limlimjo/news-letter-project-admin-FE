import React, { ChangeEvent, CSSProperties } from "react";

interface CommonInputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const CommonInput: React.FC<CommonInputProps> = ({
  type,
  value,
  onChange,
  placeholder = "입력하세요",
  disabled = false,
  style = {},
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      className={`w-full bg-gray-200 rounded px-4 py-3 ${className}`}
    />
  );
};

export default CommonInput;
