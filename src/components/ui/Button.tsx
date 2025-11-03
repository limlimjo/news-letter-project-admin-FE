import React, { ReactNode, CSSProperties, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  style = {},
  className = "",
}) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style} className={className}>
      {children}
    </button>
  );
};

export default Button;
