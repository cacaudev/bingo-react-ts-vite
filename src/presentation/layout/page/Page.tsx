import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import "./Page.css";

function Page() {
  return (
    <div>
      <Header />
      <div className="c-page-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export { Page };
