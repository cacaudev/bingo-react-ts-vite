import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomRouterProvider from "./infrastructure/routes/CustomRouterProvider.tsx";

createRoot(document.getElementById("root")!).render(<CustomRouterProvider />);
