import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import type { Campo } from "../../../../domain/jogo";
import { Form } from "react-bootstrap";

function Table() {
  const { game } = useGameContext();
  const navigate = useNavigate();
  const [campoDoMeioMarcado, setCampoDoMeioMarcado] = useState<boolean>(false);

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

  const campoMeioCheckboxChanged = (event: any) => {
    setCampoDoMeioMarcado(!campoDoMeioMarcado);
    game?.tabela.estadoCampoMeioNulo(event.target.checked);
  }

  const goToNextPage = () => {
    try {
      game?.validarTabelaERegrasParaIniciarJogo();
    } catch (e: any) {
      if (e instanceof Error) {
        alert("Valor de um dos campos da tabela é inválido, vazio ou repetido.");
        throw e;
      } else {
        console.error("An unknown error occurred:", e);
        return;
      }
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
          considerarCampoMeio={campoDoMeioMarcado}
        />

        <br />

        <Form.Check
          type="checkbox"
          id="disabledFieldsetCheck"
          label="Considerar campo no meio da cartela como marcado."
          checked={campoDoMeioMarcado}
          onChange={campoMeioCheckboxChanged}
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
