class IndiceCampo {
  private readonly x: number; // LINHA
  private readonly y: number; // COLUNA

  constructor(x: number, y: number) {
    this.verificarIndice(x);
    this.verificarIndice(y);

    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  private verificarIndice(indice: number): void {
    if (indice == null || indice === undefined || indice < -1) {
      throw new Error("Atributo indice do campo não pode estar vazio ou ser negativo.");
    }
  }
}

export { IndiceCampo };