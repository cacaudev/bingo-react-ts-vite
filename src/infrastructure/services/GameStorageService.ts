import type { Jogo } from "../../domain/jogo";
import { LocalStorageRepository } from "../repositories/LocalStorageRepository";

class GameStorageService {
  private static GAME_STORAGE_ATTRIBUTE = "current_bingo_game";
  private gameRepository;

  constructor() {
    this.gameRepository = new LocalStorageRepository();
  }

  getGame(): unknown {
    const gameLocalAsString: string | null = this.gameRepository.getItemValue(
      GameStorageService.GAME_STORAGE_ATTRIBUTE
    );
    if (!gameLocalAsString || gameLocalAsString === undefined) {
      return null;
    }
    try {
      if (gameLocalAsString) {
        return JSON.parse(gameLocalAsString);
      }
    } catch (e) {
      console.log("Error on getting game from storage: ", e);
      throw e;
    }
  }

  updateGame(game: Jogo): void {
    try {
      this.gameRepository.setItemValue(
        GameStorageService.GAME_STORAGE_ATTRIBUTE,
        JSON.stringify(game)
      );
    } catch (e) {
      console.log("Failed to update current game on storage", e);
      throw e;
    }
  }

  clearGame(): void {
    this.gameRepository.clearStorage();
  }
}

export { GameStorageService };
