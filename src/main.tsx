import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "../app/globals.css";
import "./main.css";
import { Navbar } from "./components/Navbar.tsx";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home.tsx"));
const ElementInspector = lazy(() => import("./pages/ElementInspector.tsx"));
const StyleInspector = lazy(() => import("./pages/StyleInspector.tsx"));

const router = createHashRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,

        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/elementInspector",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ElementInspector />
          </Suspense>
        ),
      },
      {
        path: "/styleInspector",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <StyleInspector />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 1500, // Default duration for all toasts
      }}
    />
  </React.StrictMode>
);
