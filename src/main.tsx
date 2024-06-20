import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "./main.css";

import { Navbar } from "./components/Navbar.tsx";
import ElementInspector from "./pages/ElementInspector.tsx";
import StyleInspector from "./pages/StyleInspector.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,

        element: <Home />,
      },
      {
        path: "/elementInspector",
        element: <ElementInspector />,
      },
      {
        path: "/styleInspector",
        element: <StyleInspector />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// {
//   path: "/searchresults",
//   element: <SearchResults />,
// },
// {
//   path: "/details/:mediaType/:id",
//   element: <Details />,
// },
