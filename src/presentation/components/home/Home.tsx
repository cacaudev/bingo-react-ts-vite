import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <h1>Bingo Player One App</h1>
      <div>
        <span style={{ color: "rgb(255, 198, 192)" }}>
          Você não tem jogos salvos!{" "}
        </span>
        <span>Crie um novo jogo:</span>
      </div>

      <Link to="/config">
        <button type="button">Criar Jogo</button>
      </Link>
    </>
  );
}

export { Home };
