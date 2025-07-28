/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useState, useContext } from "react";
import { Jogo, type JogoStatus } from "../../../domain/jogo/Jogo";
import { GameStorageService } from "../../services/GameStorageService";
import { Campo, IndiceCampo } from "../../../domain/jogo";

interface GameContextType {
  game: Jogo;
  verifyExistsAndUpdateGameSaved: () => string | null;
  updateGameStateOnStorage: () => void;
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

function GameProvider({ children }: Props) {
  const [game, setGame] = useState<Jogo>(Jogo.createDefault());
  const gameStorageService = new GameStorageService();

  const startGame = (
    nome: string,
    numeroColunas: number = 3,
    numeroLinhas: number = 3,
    regra: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ): void => {
    if (game.getStatus() != "JOGO_NAO_INICIADO") {
      throw new Error("Jogo " + game.getNome() + " já está em andamento.");
    }
    const jogo = Jogo.createCustom(nome, numeroColunas, numeroLinhas, regra);
    setGame(jogo);
    gameStorageService.updateGame(jogo);
  };

  const recuperateGameFromStorage = (jogo: any): Jogo => {
    const regras = (
      coluna: boolean,
      linha: boolean,
      tabela: boolean
    ): "LINHA" | "COLUNA" | "TABELA" => {
      if (coluna) return "COLUNA";
      if (linha) return "LINHA";
      if (tabela) return "TABELA";
      throw new Error("Nenhuma regra salva.");
    };

    const status: JogoStatus = jogo["status"];

    const novoJogo = Jogo.createCustom(
      jogo["nome"],
      jogo["tabela"]["quantidadeColunas"],
      jogo["tabela"]["quantidadeLinhas"],
      regras(
        jogo["regras"]["colunaMarcada"],
        jogo["regras"]["linhaMarcada"],
        jogo["regras"]["tabelaMarcada"]
      )
    );

    novoJogo.alterarEstadoCampoDoMeioTabela(jogo["campoDoMeioTabelaENulo"]);
    novoJogo.setDataCriacao(new Date(jogo["dataCriacao"]));

    if (status == "JOGO_CRIADO") {
      return novoJogo;
    }

    const tabela: any = jogo["tabela"]["campos"];

    for (let i = 0; i < novoJogo.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < novoJogo.getQuantidadeColunas(); j++) {
        const novoIndiceCampo = new IndiceCampo(
          tabela[i][j]["indice"]["x"],
          tabela[i][j]["indice"]["y"]
        );
        const novoCampo = new Campo(
          novoIndiceCampo,
          tabela[i][j]["valor"],
          tabela[i][j]["marcado"],
          tabela[i][j]["considerar"]
        );
        novoJogo.atualizarCampoTabela(novoCampo);
      }
    }

    if (status == "PREENCHENDO_TABELA") {
      return novoJogo;
    }

    novoJogo.iniciarJogo();

    if (jogo["numerosSorteados"].length == 0) {
      return novoJogo;
    }

    for (let i = 0; i < jogo["numerosSorteados"].length; i++) {
      novoJogo.jogarNumero(jogo["numerosSorteados"][i]["valor"]);
    }

    novoJogo.verificarSeBingoEAtualizar();

    return novoJogo;
  };

  const verifyExistsAndUpdateGameSaved = (): string | null => {
    if (game) {
      if (game.getStatus() != "JOGO_NAO_INICIADO") {
        return game.getStatus();
      }
    }

    const gameSavedOnStorageAsJSON: any = gameStorageService.getGame();
    if (gameSavedOnStorageAsJSON) {
      const novoJogo = recuperateGameFromStorage(gameSavedOnStorageAsJSON);
      setGame(novoJogo);

      setTimeout(() => {
        return novoJogo.getStatus();
      }, 500);
    }

    return null;
  };

  const updateGameStateOnStorage = (): void => {
    if (game) {
      gameStorageService.updateGame(game);
    }
  };

  const cancelCurrentGame = (): void => {
    if (game.getStatus() == "JOGO_NAO_INICIADO") {
      throw new Error("Não há nenhum jogo iniciado.");
    }
    setGame(Jogo.createDefault());
    gameStorageService.clearGame();
  };

  return (
    <GameContext.Provider
      value={{
        game,
        verifyExistsAndUpdateGameSaved,
        updateGameStateOnStorage,
        startGame,
        cancelCurrentGame,
      }}
    >
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
