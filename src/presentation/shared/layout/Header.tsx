import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

 const navigationArray = [
    { title: "Home", link: "/" },
    { title: "Config", link: "/config" },
    { title: "Tabela", link: "/table" },
    { title: "game", link: "/game" },
  ];

function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header>      
      <h1>Header</h1>
      {navigationArray.map(({ title, link }) => (
            <Link key={link} to={link}>
              <p
                className={`${
                  pathname === link ? "text-designColor" : "text-lightText"
                } text-sm uppercase font-semibold hover:text-designColor cursor-pointer duration-300 `}
              >
                {title}
              </p>
            </Link>
          ))}
    </header>
  )
}

export { Header }
