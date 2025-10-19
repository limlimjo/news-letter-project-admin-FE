import Header from "@/components/Header";
import LeftMenu from "@/components/leftmenu/LeftMenu";
import { Outlet } from "react-router";

const layout = () => {
  return (
    <>
      <div className="min-w-[80rem] bg-white">
        <div className="flex h-screen">
          <LeftMenu />
          <div className="flex-1 flex flex-col">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;
