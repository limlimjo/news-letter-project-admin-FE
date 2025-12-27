import React, { ChangeEvent, CSSProperties } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onEnter,
  placeholder = "검색어를 입력하세요",
  disabled = false,
  style = {},
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => onEnter?.()}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        disabled={disabled}
      >
        <i className="fas fa-search" />
      </button>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter?.();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        className={`w-full bg-gray-200 rounded pl-10 py-2 ${className}`}
      />
    </div>
  );
};

export default SearchInput;
