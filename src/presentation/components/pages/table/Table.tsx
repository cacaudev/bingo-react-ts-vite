/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../../../infrastructure/state/context/GameContext";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import type { Campo } from "../../../../domain/jogo";
import { Form } from "react-bootstrap";
import { Button } from "../../ui/button/Button";
import "./Table.css";
import { useToastContext } from "../../../../infrastructure/state/context/ToastContext";

function Table() {
  const {
    verifyExistsAndUpdateGameSaved,
    game,
    cancelCurrentGame,
    updateGameStateOnStorage,
  } = useGameContext();

  const navigate = useNavigate();
  const [campoDoMeioMarcado, setCampoDoMeioMarcado] = useState<boolean>(true);

  const { addAlert } = useToastContext();

  useEffect(() => {
    const gameStatus = verifyExistsAndUpdateGameSaved();
    if (gameStatus != null) {
      if (gameStatus == "JOGO_CRIADO" || gameStatus == "PREENCHENDO_TABELA") {
        navigate("/table");
        return;
      }
      if (gameStatus == "JOGO_EM_ANDAMENTO" || gameStatus == "BINGO") {
        navigate("/game");
      }
    } else {
      navigate("/config");
      return;
    }
  }, []);

  const tableChanged = (campo: Campo) => {
    try {
      game.atualizarCampoTabela(campo);
      updateGameStateOnStorage();
    } catch (e: any) {
      if (e instanceof Error) {
        console.error("An error occurred:", e.message);
        addAlert("Um erro ocorreu. Favor atualizar a página.", "ERROR");
      } else {
        console.error("An unknown error occurred:", e);
      }
    }
  };

  const campoMeioCheckboxChanged = (event: any) => {
    setCampoDoMeioMarcado(!campoDoMeioMarcado);
    game.alterarEstadoCampoDoMeioTabela(event.target.checked);

    updateGameStateOnStorage();
  };

  const goToNextPage = () => {
    try {
      game.iniciarJogo();
      updateGameStateOnStorage();
    } catch (e: any) {
      if (e instanceof Error) {
        addAlert(
          "Valor de um dos campos da tabela é inválido, vazio ou repetido.",
          "ERROR"
        );
        return;
      } else {
        console.error("An unknown error occurred:", e);
        return;
      }
    }
    navigate("/game");
  };

  const cancelGame = () => {
    cancelCurrentGame();
    navigate("/config");
  };

  return (
    <>
      <h2>{game.getNome()}</h2>

      <div>
        <p>Complete sua tabela com os valores da cartela:</p>

        <br />

        <div className="c-table">
          <TabelaComponent
            tabela={game.getTabela()}
            editable={true}
            changeTableCallback={tableChanged}
            considerarCampoMeio={campoDoMeioMarcado}
          />
          <div className="c-table-column-right">
            <div className="c-table-check">
              <Form.Check
                className="c-table"
                type="checkbox"
                id="disabledFieldsetCheck"
                label="Considerar campo no meio da cartela como marcado."
                checked={campoDoMeioMarcado}
                onChange={campoMeioCheckboxChanged}
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
        </div>
      </div>
    </>
  );
}

export { Table };
