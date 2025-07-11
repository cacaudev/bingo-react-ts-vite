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

  private constructor(
    linhaMarcada: boolean,
    colunaMarcada: boolean,
    tabelaMarcada: boolean
  ) {
    this.atualizarLinhaMarcada(linhaMarcada);
    this.atualizarColunaMarcada(colunaMarcada);
    this.atualizarTabelaMarcada(tabelaMarcada);
  }

  public static criarPadrao() {
    return new RegrasBingo(false, false, true);
  }

  public static criarCustomizado(
    linhaMarcada: boolean,
    colunaMarcada: boolean,
    tabelaMarcada: boolean
  ) {
    return new RegrasBingo(linhaMarcada, colunaMarcada, tabelaMarcada);
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
      throw new Error("Pelo menos uma regra deve estar marcada.");
    }
  }

  public static verificarRegra(regraAtualizada: boolean) {
    const isVazio = (valor: boolean): boolean =>
      valor == null || valor == undefined;
    if (isVazio(regraAtualizada)) {
      throw new Error("Regra do jogo não pode ser vazia.");
    }
  }
}

export { RegrasBingo };
export type { IRegrasBingoDTO };
