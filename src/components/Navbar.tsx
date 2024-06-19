import { Outlet, Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div>
        <p>Movies DB</p>
      </div>
      <Link to={"/app"}>App</Link>
      <Outlet />
    </>
  );
};
// className="flex sm:flex-row flex-col sm:justify-between justify-center items-center p-5 bg-cyan-800"
//className="lg:text-lg font-bold"
