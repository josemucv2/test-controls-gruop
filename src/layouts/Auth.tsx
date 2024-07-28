import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};
