import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button";
import { useEffect } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContext";

function Home() {
  const navigate = useNavigate();

  const irParaConfiguracao = () => {
    navigate("/config");
  };

  const { verifyExistsAndUpdateGameSaved, game } = useGameContext();

  useEffect(() => {
    const gameStatus = verifyExistsAndUpdateGameSaved();
    if (gameStatus != null) {
      console.log("game ", gameStatus);
      
      if (gameStatus == "JOGO_CRIADO" || gameStatus == "PREENCHENDO_TABELA") {
        navigate("/table");
        return;
      }
      if (gameStatus == "JOGO_EM_ANDAMENTO" || gameStatus == "BINGO") {
        navigate("/game");
      }
    }
  }, [game]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        textAlign: "center",
        maxWidth: "500px",
      }}
    >
      <p>
        Bem-vindo(a) ao Bingo Player App, seu assistente virtual para jogar
        bingo. Nossa ferramenta te auxilia na jogatina verificando e marcando os
        números sorteados, te avisando em tempo real para não perder nenhum
        prêmio.
      </p>

      <p>
        DISCLAIMER: Essa ferramenta não tem o objetivo de criar cartelas de
        bingo, nosso intuito é apenas de ajudar o usuário na hora do jogo em si,
        eliminando uso de editores de pdf ou IAs para marcar cartelas.{" "}
        <b>
          Para usar este assistente você deve já ter em maõs uma cartela pronta.
        </b>
      </p>

      <br />

      <Button onClick={irParaConfiguracao} text={"Iniciar"} role={"primary"} />
    </div>
  );
}

export { Home };
