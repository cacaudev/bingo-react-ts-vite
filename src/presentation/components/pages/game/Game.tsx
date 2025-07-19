import { useEffect, useState } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContext";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import { Form } from "react-bootstrap";
import { NumeroSorteado } from "../../../../domain/jogo";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button";

function Game() {
  const { game, gameStatus, updateStatus, cancelCurrentGame } = useGameContext();

  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [numerosSorteadosString, setNumerosSorteadosString] =
    useState<string>("");
  const [estadoNumeroSorteado, setEstadoNumeroSorteado] = useState<
    "ENCONTRADO" | "NAO_ENCONTRADO" | null
  >(null);
  const [bingo, setBingo] = useState<boolean>(false);

  const navigate = useNavigate();

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
    if (gameStatus == "JOGO_CRIADO" || gameStatus == "PREENCHENDO_TABELA") {
      navigate("/table");
    }
  }, []);

  const changedNumeroSorteado = (event: any): void => {
    setNumeroSorteado(event.target.value);
  };

  const jogarNumero = () => {
    const { foiAchado, foiBingo } = game.jogarNumero(numeroSorteado.toString());
    atualizarNumerosSorteadosView();

    if (foiBingo) {
      setBingo(true);
      updateStatus("BINGO");
    } else {
      updateStatus("JOGO_EM_ANDAMENTO");
    }

    setEstadoNumeroSorteado(foiAchado ? "ENCONTRADO" : "NAO_ENCONTRADO");
  };

  const atualizarNumerosSorteadosView = () => {
    const novaView: string = game
      .getNumerosSorteados()
      .map((numero: NumeroSorteado) => numero.getValor())
      .join(", ");
    setNumerosSorteadosString(novaView);
  };

  const resetarJogo = () => {
    game?.resetarJogo();
    setBingo(false);
    setNumerosSorteadosString("");
    atualizarNumerosSorteadosView();
  };

  const desfazerUltimoNumeroJogado = () => {
    game?.desfazerUltimoNumeroJogado();
    atualizarNumerosSorteadosView();
  };

  const handleKeyPress = (event) => {
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
  }

  return (
    <>
      <h1>Hora de jogar!</h1>
      <br />
      <h2>Jogo: {game?.getNome()}</h2>
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        <TabelaComponent tabela={game?.tabela} editable={false} />
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
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Form.Control
              type="number"
              id="numeroJogado"
              onChange={changedNumeroSorteado}
              value={numeroSorteado}
              disabled={bingo}
              onKeyDown={handleKeyPress}
            />
            <button
              type="button"
              onClick={jogarNumero}
              style={{ backgroundColor: "red", width: "100%" }}
              disabled={bingo}
            >
              Jogar número
            </button>
          </div>

          <p>
            {estadoNumeroSorteado != null && (
              <>
                {" "}
                Último número sorteado: {numeroSorteado} Estado:{" "}
                {estadoNumeroSorteado}
              </>
            )}
          </p>

          <div>
            <h3>Números jogados:</h3>
            <div style={{ maxWidth: "300px" }}>
              <h5>{numerosSorteadosString}</h5>
            </div>
          </div>

          <br />

          <div>
            <button
              type="button"
              onClick={desfazerUltimoNumeroJogado}
              disabled={bingo}
              style={{ width: "100%" }}
            >
              Desfazer último número jogado
            </button>
          </div>

          <br />

          <div>{bingo && <h1>Bingo!!!</h1>}</div>
        </div>
      </div>
      <br />

      <div>
        <button type="button" onClick={resetarJogo}>
          Resetar jogo
        </button>

         <Button
            onClick={newGame}
            text={"Novo Jogo"}
            role={"secondary"}
          />
      </div>
    </>
  );
}

export { Game };
