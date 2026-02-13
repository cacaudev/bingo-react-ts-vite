/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContext";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import { Alert, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NumeroSorteado } from "../../../../domain/jogo";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button";
import "./Game.css";
import { useToastContext } from "../../../../infrastructure/state/context/ToastContext";

function Game() {
  const {
    game,
    verifyExistsAndUpdateGameSaved,
    cancelCurrentGame,
    updateGameStateOnStorage,
  } = useGameContext();

  const [numeroSorteado, setNumeroSorteado] = useState<string>("");
  const [numerosSorteadosString, setNumerosSorteadosString] =
    useState<string>("");
  const [textoNumeroSorteado, setTextoNumeroSorteado] = useState<string>("");
  const [achadoNumeroSorteado, setAchadoNumeroSorteado] =
    useState<boolean>(false);
  const [bingo, setBingo] = useState<boolean>(false);

  const navigate = useNavigate();
  const { addAlert } = useToastContext();

  useEffect(() => {
    const gameStatus = verifyExistsAndUpdateGameSaved();
    if (gameStatus != null) {
      if (gameStatus == "JOGO_CRIADO" || gameStatus == "PREENCHENDO_TABELA") {
        navigate("/table");
        return;
      }

      atualizarNumerosSorteadosView();
      if (gameStatus == "BINGO") {
        setBingo(true);
      }
    } else {
      navigate("/config");
      return;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTextoNumeroSorteado("");
      setAchadoNumeroSorteado(false);
    }, 5000);
  }, [textoNumeroSorteado]);

  const changedNumeroSorteado = (event: any): void => {
    setNumeroSorteado(event.target.value);
  };

  const jogarNumero = () => {
    if (
      numeroSorteado == null ||
      numeroSorteado == undefined ||
      numeroSorteado == ""
    ) {
      return;
    }

    const { foiAchado, foiBingo } = game.jogarNumero(numeroSorteado.toString());
    atualizarNumerosSorteadosView();

    if (foiBingo) {
      setBingo(true);
      addAlert("Parabéns!!","SUCCESS")
    }

    setAchadoNumeroSorteado(foiAchado);
    setTextoNumeroSorteado(
      foiAchado
        ? `Número ${numeroSorteado} foi encontrado.`
        : `Número ${numeroSorteado} não foi encontrado.`
    );

    setNumeroSorteado("");
    updateGameStateOnStorage();
  };

  const atualizarNumerosSorteadosView = () => {
    const novaView: string = game
      .getNumerosSorteados()
      .map((numero: NumeroSorteado) => numero.getValor())
      .join(", ");
    setNumerosSorteadosString(novaView);
  };

  const resetarJogo = () => {
    game.reiniciarJogoEmAndamento();
    setBingo(false);
    setNumerosSorteadosString("");
    atualizarNumerosSorteadosView();

    setTimeout(() => {
      updateGameStateOnStorage();
    }, 2000);
  };

  const desfazerUltimoNumeroJogado = () => {
    game?.desfazerUltimoNumeroJogado();
    atualizarNumerosSorteadosView();
    updateGameStateOnStorage();
  };

  const handleKeyPress = (event: any) => {
    // Disable decimal number
    if (event.key === "." || event.key === ",") {
      event.preventDefault();
    }

    // Accepts enter to submit new value
    if (event.key === "Enter") {
      jogarNumero();
    }
  };

  const newGame = () => {
    cancelCurrentGame();
    navigate("/config");
  };

  const TooltipCustom = ({ id, children, title }) => (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
      <a>{children}</a>
    </OverlayTrigger>
  );

  return (
    <>
      <h1>Hora de jogar!</h1>
      <br />
      <h2>Jogo: {game.getNome()}</h2>
      <br />

      <div className="c-game">
        <TabelaComponent
          tabela={game.getTabela()}
          editable={false}
          considerarCampoMeio={game.getEstadoNumeroDoMeioTabelaSeNulo()}
        />
        <div className="c-column-right-table">
          <div className="c-numbers">
            <div className="c-play-number">
              <Form.Control
                type="number"
                id="numeroJogado"
                onChange={changedNumeroSorteado}
                value={numeroSorteado}
                disabled={bingo}
                onKeyDown={handleKeyPress}
                placeholder="Número"
              />
              <Button
                onClick={jogarNumero}
                text={"Adicionar número sorteado"}
                role={"primary"}
              />
            </div>

            {textoNumeroSorteado != "" && !bingo && (
              <Alert
                key={achadoNumeroSorteado ? "success" : "warning"}
                variant={achadoNumeroSorteado ? "success" : "warning"}
              >
                {textoNumeroSorteado}
              </Alert>
            )}
          </div>

          <div className="c-sorted-numbers" style={{ maxWidth: '425px' }}>
            <h6>Números sorteados:</h6>
            <div>
              <h5>{numerosSorteadosString}</h5>
            </div>
          </div>

          {!bingo && (
            <Button
              role={"secondary"}
              onClick={desfazerUltimoNumeroJogado}
              text={"Desfazer último número jogado"}
            />
          )}
          {bingo && <div className="c-bingo-message">Bingo!!!</div>}
        </div>
      </div>
      <br />

      <div className="c-game__footer_buttons">
        <TooltipCustom
          title="Desmarcar todos os números sorteados da cartela atual."
          id="t-1"
        >
          <Button
            onClick={resetarJogo}
            text={"Resetar Jogo"}
            role={"secondary"}
          />
        </TooltipCustom>
        <TooltipCustom title="Inicia novo jogo para nova cartela." id="t-2">
          <Button
            onClick={newGame}
            text={"Cancela Jogo Atual"}
            role={"secondary"}
          />
        </TooltipCustom>
      </div>
    </>
  );
}

export { Game };
