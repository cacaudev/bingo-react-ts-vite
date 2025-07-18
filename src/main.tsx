import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/Main.css";
import CustomRouterProvider from "./infrastructure/routes/CustomRouterProvider.tsx";

createRoot(document.getElementById("root")!).render(<CustomRouterProvider />);
