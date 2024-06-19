import { Outlet, Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div id="navbar-container">
        <ul>
          <li>
            {" "}
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            {" "}
            <Link to={"/elementInspector"}>Inspector</Link>
          </li>
          <li>
            {" "}
            <Link to={"/styleInspector"}>Style</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};
// className="flex sm:flex-row flex-col sm:justify-between justify-center items-center p-5 bg-cyan-800"
//className="lg:text-lg font-bold"
