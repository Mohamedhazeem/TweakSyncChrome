import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";

import { Navbar } from "./components/Navbar.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        // index: true,
        path: "/app",
        element: <App />,
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
//   path: "/trending",
//   element: <Trending />,
// },
// {
//   path: "/not_found",
//   element: <NotFound />,
// },
// {
//   path: "/searchresults",
//   element: <SearchResults />,
// },
// {
//   path: "/details/:mediaType/:id",
//   element: <Details />,
// },
