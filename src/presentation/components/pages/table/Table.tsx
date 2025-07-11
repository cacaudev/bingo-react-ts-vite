import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";

function Table() {
  const { game } = useGameContext();

  useEffect(() => {
    if (game != null) {
      console.log("nome jogo ", game.getNome());
      console.log("nome data ", game.getDataCriacao());
      console.log("nome jogo e data ", game.tabela.getQuantidadeCamposTabela());
    } else {
      throw new Error("Jogo não iniciado!");
    }
  }, []);

  return (
    <>
      <h1>Tabela Jogo</h1>

      <div>
        <p>Complete sua tabela com os valores nos campos:</p>

        <br/>
        <Link to="/config">
          <button type="button">Voltar</button>
        </Link>
        <Link to="/game">
          <button type="button">Próximo</button>
        </Link>
      </div>
    </>
  );
}

export { Table };
