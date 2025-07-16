import { Campo } from "./Campo";
import type { ValorCampo } from "./Campo";

import { IndiceCampo } from "./IndiceCampo";

interface ITabelaDTO {
  quantidadeColunas: number;
  quantidadeLinhas: number;
}

class Tabela {
  private readonly quantidadeColunas: number;
  private readonly quantidadeLinhas: number;
  public readonly campos: Campo[][];
  private tabelaValidada: boolean;

  constructor(quantidadeColunas: number, quantidadeLinhas: number) {
    Tabela.verificarQuantidadeColunas(quantidadeColunas);
    Tabela.verificarQuantidadeLinhas(quantidadeLinhas);

    this.quantidadeColunas = quantidadeColunas;
    this.quantidadeLinhas = quantidadeLinhas;
    this.tabelaValidada = false;
    this.campos = Tabela.gerarTabelaInicial(
      quantidadeColunas,
      quantidadeLinhas
    );
  }

  /**
   * Get Functions
   */
  public getQuantidadeColunas(): number {
    return this.quantidadeColunas;
  }
  public getQuantidadeLinhas(): number {
    return this.quantidadeLinhas;
  }
  public getTabelaValidada(): boolean {
    return this.tabelaValidada;
  }

  /**
   * Sanitize quantidade colunas
   * @param quantidadeColunas number
   */
  private static verificarQuantidadeColunas(quantidadeColunas: number): void {
    const isVazio = (valor: number): boolean =>
      valor == null || valor == undefined;
    const minimoColunas = 2;
    const maximoColunas = 5;

    if (isVazio(quantidadeColunas)) {
      throw new Error("Quantidade de colunas do jogo não pode ser vazia.");
    }
    if (quantidadeColunas < minimoColunas) {
      throw new Error(
        `Quantidade de colunas do jogo deve ter valor mínimo de ${minimoColunas} colunas.`
      );
    }
    if (quantidadeColunas > maximoColunas) {
      throw new Error(
        `Quantidade de colunas do jogo deve ter valor máximo de ${maximoColunas} colunas.`
      );
    }
  }

  /**
   * Sanitize quantidade linhas
   * @param quantidadeLinhas number
   */
  private static verificarQuantidadeLinhas(quantidadeLinhas: number): void {
    const isVazio = (valor: number): boolean =>
      valor == null || valor == undefined;
    const minimoLinhas = 2;
    const maximoLinhas = 5;

    if (isVazio(quantidadeLinhas)) {
      throw new Error("Quantidade de linhas do jogo não pode ser vazia.");
    }
    if (quantidadeLinhas < minimoLinhas) {
      throw new Error(
        `Quantidade de linhas do jogo deve ter valor mínimo de ${minimoLinhas} linhas.`
      );
    }
    if (quantidadeLinhas > maximoLinhas) {
      throw new Error(
        `Quantidade de linhas do jogo deve ter valor máximo de ${maximoLinhas} linhas.`
      );
    }
  }

  private static gerarTabelaInicial(
    quantidadeColunas: number,
    quantidadeLinhas: number,
    valorDefault: ValorCampo = null
  ): Campo[][] {
    const novosCampos = [];

    for (let i = 0; i < quantidadeLinhas; i++) {
      const novaLinha: Campo[] = [];

      for (let j = 0; j < quantidadeColunas; j++) {
        novaLinha.push(new Campo(new IndiceCampo(i, j), valorDefault, false));
      }

      novosCampos.push(novaLinha);
    }
    return novosCampos;
  }

  public getQuantidadeCamposTabela(): number {
    return this.quantidadeColunas * this.quantidadeLinhas;
  }

  /**
   * Confere se tabela está pronta para começar o jogo,
   * todos os campos devem estar preenchidos.
   */
  public validarTabela(): void {
    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        if (!this.campos[i][j].verificarSeValorFinalValido()) {
          this.tabelaValidada = false;
          throw new Error(
            "Valor de um dos campos da tabela é inválido ou está vazio."
          );
        }
      }
    }
    this.tabelaValidada = true;
  }

  private static mesmoIndice = (
    indiceOriginal: IndiceCampo,
    x: number,
    y: number
  ): boolean => {
    return indiceOriginal.getX() == x && indiceOriginal.getY() == y;
  };

  public verificarSeValorJaExisteNaTabela(
    valorCampo: ValorCampo,
    indiceCampo: IndiceCampo
  ) {
    if (valorCampo == null || valorCampo == undefined || valorCampo == "") {
      return false;
    }

    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        if (
          this.campos[i][j].getConsiderar() &&
          this.campos[i][j].getValor() === valorCampo &&
          !Tabela.mesmoIndice(indiceCampo, i, j)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  public atualizarCampo(campoAtualizado: Campo) {
    if (
      this.verificarSeValorJaExisteNaTabela(
        campoAtualizado.getValor(),
        campoAtualizado.getIndice()
      )
    ) {
      throw new Error("Valor já existe na tabela.");
    }
    const indice = campoAtualizado.getIndice();
    this.campos[indice.getX()][indice.getY()] = campoAtualizado;
  }

  public estadoCampoMeioNulo(considerarNulo: boolean = true) {
    if (this.getQuantidadeColunas() != this.getQuantidadeLinhas()) {
      throw new Error("Número de linhas é diferente do número de colunas.")
    }
    const indiceMeio = Math.floor(this.getQuantidadeColunas() / 2);
    
    const novoCampo = new Campo(new IndiceCampo(indiceMeio, indiceMeio), "*", considerarNulo, !considerarNulo);
    this.campos[novoCampo.getIndice().getX()][novoCampo.getIndice().getY()] = novoCampo;
  }

  public resetarMarcacaoDeTodosOsCampos() {
    for (let i = 0; i < this.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.getQuantidadeColunas(); j++) {
        if (this.campos[i][j].getConsiderar()) {
          this.campos[i][j].atualizarMarcado(false);
        }
      }
    }
  }
}

export { Tabela };
export type { ITabelaDTO };
