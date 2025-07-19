import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../../../infrastructure/state/context/GameContext";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import type { Campo } from "../../../../domain/jogo";
import { Form } from "react-bootstrap";
import { Button } from "../../ui/button/Button";
import "./Table.css";

function Table() {
  const { game, gameStatus, updateStatus, cancelCurrentGame } = useGameContext();
  const navigate = useNavigate();
  const [campoDoMeioMarcado, setCampoDoMeioMarcado] = useState<boolean>(false);

  useEffect(() => {
    if (game != null) {
      console.log("nome jogo ", game.getNome());
      console.log("nome data ", game.getDataCriacao());
      console.log("nome jogo e data ", game.tabela.getQuantidadeCamposTabela());
    }
  }, [game]);

  useEffect(() => {
    if (gameStatus == "JOGO_NAO_CRIADO") {
      navigate("/config");
      return;
    }

    if (
      gameStatus == "TABELA_PREENCHIDA" ||
      gameStatus == "JOGO_EM_ANDAMENTO" ||
      gameStatus == "BINGO"
    ) {
      navigate("/game");
    }
  }, []);

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

    updateStatus("PREENCHENDO_TABELA");
  };

  const campoMeioCheckboxChanged = (event: any) => {
    setCampoDoMeioMarcado(!campoDoMeioMarcado);
    game?.tabela.estadoCampoMeioNulo(event.target.checked);
  };

  const goToNextPage = () => {
    try {
      game?.validarTabelaERegrasParaIniciarJogo();
    } catch (e: any) {
      if (e instanceof Error) {
        alert(
          "Valor de um dos campos da tabela é inválido, vazio ou repetido."
        );
        throw e;
      } else {
        console.error("An unknown error occurred:", e);
        return;
      }
    }

    updateStatus("TABELA_PREENCHIDA");
    navigate("/game");
  };

  const cancelGame = () => {
    cancelCurrentGame();
    navigate("/config");
  };

  return (
    <>
      <h1>{game?.getNome()}</h1>

      <div>
        <p>Complete sua tabela com os valores nos campos:</p>

        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "baseline",
            alignItems: "flex-start",
            textAlign: "initial",
            gap: "20px",
          }}
        >
          <Form.Check
            type="checkbox"
            id="disabledFieldsetCheck"
            label="Considerar campo no meio da cartela como marcado."
            checked={campoDoMeioMarcado}
            onChange={campoMeioCheckboxChanged}
          />
          <TabelaComponent
            tabela={game?.tabela}
            editable={true}
            changeTableCallback={tableChanged}
            considerarCampoMeio={campoDoMeioMarcado}
          />
        </div>

        <div className="c-table__buttons">
          <Button
            onClick={cancelGame}
            text={"Cancelar Jogo Atual"}
            role={"secondary"}
          />

          <Button onClick={goToNextPage} text={"Jogar"} role={"primary"} />
        </div>
      </div>
    </>
  );
}

export { Table };
