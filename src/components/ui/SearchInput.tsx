import React, { ChangeEvent, CSSProperties } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
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
      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
        className={`bg-gray-200 rounded pl-10 pr-145 py-2 ${className}`}
      />
    </div>
  );
};

export default SearchInput;
