import { useNavigate } from "react-router-dom";

export const SideNav = () => {
  const goPage = useNavigate();

  const go = (url: string) => {
    goPage(url);
  };
  return (
    <nav className="w-64 bg-gray-800 text-white h-screen">
      <ul className="p-5 space-y-10">
        <li onClick={() => go("/app")} className="hover:underline cursor-pointer">Home</li>
        <li onClick={() => go("episodes")} className="hover:underline cursor-pointer">Episodes</li>
        <li onClick={() => go("/")} className="hover:underline cursor-pointer">Logout</li>
      </ul>
    </nav>
  );
};
