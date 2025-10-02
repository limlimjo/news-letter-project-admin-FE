import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="page">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
