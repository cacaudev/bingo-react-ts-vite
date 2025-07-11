import { IndiceCampo } from './IndiceCampo';

type ValorCampo = string | null;

class Campo {
  private readonly indice: IndiceCampo;
  private valor: ValorCampo = "1";
  private marcado: boolean;
  private considerar: boolean;

  public constructor(
    indice: IndiceCampo,
    valor: ValorCampo,
    marcado = false,
    considerar = true
  ) {
    Campo.verificarValorInicial(valor);
    Campo.verificarMarcado(marcado);
    Campo.verificarConsiderar(considerar);

    this.indice = indice;
    this.valor = valor;
    this.marcado = considerar ? marcado : true;
    this.considerar = considerar;
  }

  public verificarValorFinal(): boolean {
    if (this.valor == null || this.valor === undefined) {
      return false;
    }
    return true;
  }
  private static verificarValorInicial(valor: ValorCampo): void {
    if (valor === undefined) {
      throw new Error(
        'Valor do campo final não pode ser undefined. Valores possíveis iniciais: números ou textos ou null.'
      );
    }
  }

  private static verificarMarcado(marcado: boolean): void {
    if (marcado == null || marcado === undefined) {
      throw new Error('Atributo marcado do campo não pode estar vazio.');
    }
  }
  private static verificarConsiderar(regra: boolean): void {
    if (regra == null || regra === undefined) {
      throw new Error('Atributo considerar do campo não pode estar vazio.');
    }
  }

  /**
   * Get Functions
   */
  public getValor(): ValorCampo {
    return this.valor;
  }
  public getMarcado(): boolean {
    return this.marcado;
  }
  public getConsiderar(): boolean {
    return this.considerar;
  }
  public getIndice(): IndiceCampo {
    return this.indice;
  }

  /**
   * Set Functions
   */
  public atualizarValor(valor: ValorCampo) {
    Campo.verificarValorInicial(valor);
    this.valor = valor;
  }
  public atualizarMarcado(marcado: boolean) {
    Campo.verificarMarcado(marcado);
    this.marcado = marcado;
  }
  public atualizarConsiderar(regra: boolean) {
    Campo.verificarConsiderar(regra);
    this.considerar = regra;
  }
}

export { Campo };
export type { ValorCampo };