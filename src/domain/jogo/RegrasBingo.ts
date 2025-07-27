interface IRegrasBingoDTO {
  linhaMarcada: boolean;
  colunaMarcada: boolean;
  tabelaMarcada: boolean;
}

/**
 * Configuração para considerar o bingo
 */
class RegrasBingo {
  private linhaMarcada = false;
  private colunaMarcada = false;
  private tabelaMarcada = true;

  public constructor(
    opcao: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ) {
    this.atualizarLinhaMarcada(opcao == "LINHA");
    this.atualizarColunaMarcada(opcao == "COLUNA");
    this.atualizarTabelaMarcada(opcao == "TABELA");
  }

  /**
   * Get Functions
   */
  public getLinhaMarcada(): boolean {
    return this.linhaMarcada;
  }
  public getColunaMarcada(): boolean {
    return this.colunaMarcada;
  }
  public getTabelaMarcada(): boolean {
    return this.tabelaMarcada;
  }

  /**
   * Set Functions
   */
  public atualizarLinhaMarcada(regraAtualizada: boolean) {
    RegrasBingo.verificarRegra(regraAtualizada);
    this.linhaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.tabelaMarcada = false;
    }
    this.validarRegras();
  }
  public atualizarColunaMarcada(regraAtualizada: boolean) {
    RegrasBingo.verificarRegra(regraAtualizada);
    this.colunaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.tabelaMarcada = false;
    }
    this.validarRegras();
  }
  public atualizarTabelaMarcada(regraAtualizada: boolean) {
    RegrasBingo.verificarRegra(regraAtualizada);
    this.tabelaMarcada = regraAtualizada;
    if (regraAtualizada) {
      this.colunaMarcada = false;
      this.linhaMarcada = false;
    }
    this.validarRegras();
  }

  public validarRegras() {
    RegrasBingo.verificarRegra(this.colunaMarcada);
    RegrasBingo.verificarRegra(this.linhaMarcada);
    RegrasBingo.verificarRegra(this.tabelaMarcada);

    if (!this.colunaMarcada && !this.linhaMarcada && !this.tabelaMarcada) {
      throw new Error("Pelo menos um tipo de regra deve estar marcada.");
    }
  }

  private static verificarRegra(regraAtualizada: boolean) {
    const isVazio = (valor: boolean): boolean =>
      valor == null || valor == undefined;
    if (isVazio(regraAtualizada)) {
      throw new Error("Regra do jogo não pode ser vazia.");
    }
  }
}

export { RegrasBingo };
export type { IRegrasBingoDTO };
