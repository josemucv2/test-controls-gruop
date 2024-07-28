import { Outlet } from "react-router-dom";
import { SideNav } from "../components/containers/SideNav";
export const CoreLayout = () => {
  return (
    <div className="flex">
      <SideNav />
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </div>
  );
};
