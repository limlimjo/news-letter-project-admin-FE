import { Link, NavLink } from "react-router";
import URL from "../../../constants/url";

const LeftMenu = () => {
  return (
    <aside
      id="sidebar"
      className="bg-gray-200 w-64 min-w-[16rem] text-gray-800 py-7 px-2 space-y-6 z-10 relative transition duration-200"
    >
      <div className="flex justify-between items-center px-4 mb-10">
        <Link to="/" className="text-2xl font-medium">
          Newsletter Admin
        </Link>
      </div>
      <div className="px-4 mb-2">
        <span className="text-lg font-medium text-gray-600">메뉴</span>
      </div>
      <nav className="flex flex-col gap-y-3">
        <div className="flex flex-col">
          <NavLink
            to={URL.ADMIN_CONTENTS}
            className={({ isActive }) =>
              `text-xl font-medium py-1.5 px-4 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-300" : "hover:bg-gray-300"
              }`
            }
          >
            <i className="fas fa-file-lines mr-4.5"></i>웹 콘텐츠 관리
          </NavLink>
        </div>
        <div className="flex flex-col">
          <NavLink
            to={URL.ADMIN_NEWSLETTERS}
            className={({ isActive }) =>
              `text-xl font-medium py-1.5 px-4 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-300" : "hover:bg-gray-300"
              }`
            }
          >
            <i className="fas fa-file-lines mr-4.5"></i>뉴스레터 관리
          </NavLink>
        </div>
        <div className="flex flex-col">
          <NavLink
            to={URL.ADMIN_SUBSCRIBERS}
            className={({ isActive }) =>
              `text-xl font-medium py-1.5 px-4 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-300" : "hover:bg-gray-300"
              }`
            }
          >
            <i className="fas fa-users mr-2"></i>구독자 관리
          </NavLink>
        </div>
        <div className="flex flex-col">
          <NavLink
            to={URL.ADMIN_DASHBOARD}
            className={({ isActive }) =>
              `text-xl font-medium py-1.5 px-4 rounded transition-colors duration-200 ${
                isActive ? "bg-gray-300" : "hover:bg-gray-300"
              }`
            }
          >
            <i className="fas fa-chart-bar mr-3"></i>통계 대시보드
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default LeftMenu;
