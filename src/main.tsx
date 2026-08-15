/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "../app/globals.css";
import "./main.css";
import { Navbar } from "./components/Navbar.tsx";
import { Toaster } from "react-hot-toast";
import { ExtensionProvider } from "./extension/ExtensionProvider";
import NotFoundInspector from "./pages/NotFoundInspector.tsx";
import DynamicImportError from "./pages/DynamicImportError.tsx";
import Home from "./pages/Home.tsx";
const ElementInspector = lazy(() =>
  import("./pages/ElementInspector.tsx")
    .then((module) => module)
    .catch(() => {
      return {
        default: () => <NotFoundInspector inspectorName="Element Inspector" isError={true} />,
      };
    })
);
const StyleInspector = lazy(() =>
  import("./pages/StyleInspector.tsx")
    .then((module) => module)
    .catch(() => {
      return {
        default: () => <NotFoundInspector inspectorName="Style Inspector" isError={true} />,
      };
    })
);
const TutorialPage = lazy(() =>
  import("./pages/TutorialPage.tsx")
    .then((module) => module)
    .catch(() => {
      return {
        default: () => <DynamicImportError />,
      };
    })
);
const SupportPage = lazy(() =>
  import("./pages/SupportPage.tsx")
    .then((module) => module)
    .catch(() => {
      return {
        default: () => <DynamicImportError />,
      };
    })
);

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
      {
        path: "/tutorial",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TutorialPage />
          </Suspense>
        ),
      },
      {
        path: "/support",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SupportPage />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ExtensionProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500, // Default duration for all toasts
        }}
      />
    </ExtensionProvider>
  </React.StrictMode>
);
