import React, { CSSProperties, ReactNode } from "react";

interface CardBoxProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({ style, className, children }) => {
  return (
    <div style={style} className={`bg-white border border-gray-200 rounded-md ${className}`}>
      {/* 내부 내용 렌더링 */}
      {children}
    </div>
  );
};

export default CardBox;
