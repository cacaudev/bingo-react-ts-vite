import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import type { Campo } from "../../../../domain/jogo";

function Table() {
  const { game } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (game != null) {
      console.log("nome jogo ", game.getNome());
      console.log("nome data ", game.getDataCriacao());
      console.log("nome jogo e data ", game.tabela.getQuantidadeCamposTabela());
    }
  }, [game]);

  const tableChanged = (campo: Campo) => {
    try {
      game?.tabela.atualizarCampo(campo);
    } catch (e: any) {
      if (e instanceof Error) {
        console.error("An error occurred:", e.message);
        alert(e.message);
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const goToNextPage = () => {
    if (!game?.tabela.validarTabela()) {
      alert("Valor de um dos campos da tabela é inválido ou está vazio.");
      throw new Error(
        "Valor de um dos campos da tabela é inválido ou está vazio."
      );
    }
    navigate("/game");
  };

  return (
    <>
      <h1>Tabela Jogo: {game?.getNome()}</h1>

      <div>
        <p>Complete sua tabela com os valores nos campos:</p>

        <br />

        <TabelaComponent
          tabela={game?.tabela}
          editable={true}
          changeTableCallback={tableChanged}
        />

        <br />

        <Link to="/config">
          <button type="button">Cancelar Jogo Atual</button>
        </Link>
        <button type="button" onClick={goToNextPage}>
          Jogar
        </button>
      </div>
    </>
  );
}

export { Table };
