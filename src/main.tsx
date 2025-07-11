import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./infra/bootstrap/App.tsx";
import Header from "./presentation/components/layout/Header.tsx";
import Footer from "./presentation/components/layout/Header.tsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
