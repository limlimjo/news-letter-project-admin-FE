import { useEffect, useState } from "react";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-2 h-16 bg-white border-b-4 border-gray-200">
      <div className="flex items-center">
        <i className="fas fa-clock mr-2"></i>
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </div>
    </header>
  );
};

export default Header;
