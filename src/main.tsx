import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CustomRouterProvider from "./infrastructure/routes/CustomRouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomRouterProvider />
  </StrictMode>
);
