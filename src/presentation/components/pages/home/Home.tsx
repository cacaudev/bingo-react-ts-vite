import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <div>
        <span style={{ color: "rgb(255, 198, 192)" }}>
          Você não tem jogos salvos!{" "}
        </span>        <span>Crie um novo jogo:</span>
      </div>

      <br />

      <Link to="/config">
        <button type="button">Criar Jogo</button>
      </Link>

      <br />
    </>
  );
}

export { Home };
