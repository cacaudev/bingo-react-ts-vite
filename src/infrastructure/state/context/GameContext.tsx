/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState, useContext } from "react";
import { Jogo } from "../../../domain/jogo/Jogo";

interface GameContextType {
  game: Jogo | null;
  gameStatus: GameStatus;
  updateStatus: (status: GameStatus) => void;
  startGame: (
    nome: string,
    numeroColunas: number,
    numeroLinhas: number,
    regra: "LINHA" | "COLUNA" | "TABELA"
  ) => void;
  cancelCurrentGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

interface Props {
  children: ReactNode;
}

type GameStatus = "JOGO_NAO_CRIADO"
    | "JOGO_CRIADO"
    | "PREENCHENDO_TABELA"
    | "TABELA_PREENCHIDA"
    | "JOGO_EM_ANDAMENTO"
    | "BINGO";

function GameProvider({ children }: Props) {
  const [game, setGame] = useState<Jogo | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("JOGO_NAO_CRIADO");

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
    setGameStatus("JOGO_CRIADO");
  };

  const updateStatus = (status: GameStatus): void => {
    if (status == null || status == undefined) {
      throw new Error("Status não reconhecido.")
    }
    setGameStatus(status);
  }

  const cancelCurrentGame = (): void => {
    if (game == null) {
      throw new Error("Não há nenhum jogo iniciado.")
    }
    setGame(null);
    updateStatus("JOGO_NAO_CRIADO");
  }

  return (
    <GameContext.Provider value={{ game, startGame, gameStatus, updateStatus, cancelCurrentGame }}>
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
