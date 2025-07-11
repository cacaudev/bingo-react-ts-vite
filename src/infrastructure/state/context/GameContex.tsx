/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState, useContext } from "react";
import { Jogo } from "../../../domain/jogo/Jogo";

interface GameContextType {
  game: Jogo | null;
  startGame: (
    nome: string,
    numeroColunas: number,
    numeroLinhas: number,
    regra: "LINHA" | "COLUNA" | "TABELA"
  ) => void;
}

const GameContext = createContext<GameContextType | null>(null);

interface Props {
  children: ReactNode;
}

function GameProvider({ children }: Props) {
  const [game, setGame] = useState<Jogo | null>(null);

  const startGame = (
    nome: string,
    numeroColunas: number = 3,
    numeroLinhas: number = 3,
    regra: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ): void => {
    if (game != null) {
      throw new Error("Jogo " + game.getNome() + " já está em andamento.");
    }
    const jogo = new Jogo(nome, numeroColunas, numeroLinhas, regra);
    setGame(jogo);
  };

  return (
    <GameContext.Provider value={{ game, startGame }}>
      {children}
    </GameContext.Provider>
  );
}

function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (context == null || !context) {
    throw new Error("useGame deve ser usado dentro de um GameProvider");
  }
  return context;
}

export { GameProvider, useGameContext };
