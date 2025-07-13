import { useEffect } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";

function Game() {
  const { game } = useGameContext();

  useEffect(() => {
    if (game != null) {
      console.log("nome jogo ", game.getNome());
      console.log("nome data ", game.getDataCriacao());
      console.log("nome jogo e data ", game.tabela.getQuantidadeCamposTabela());
    }
  }, [game]);

  return (
    <>
      <h1>Game!</h1>
      <br />
      <TabelaComponent tabela={game?.tabela} editable={false} />
      <br />
    </>
  );
}

export { Game };
