import React, { CSSProperties } from "react";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  style = {},
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={style}
      className={`bg-gray-200 rounded-md px-10 py-2 text-sm ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
