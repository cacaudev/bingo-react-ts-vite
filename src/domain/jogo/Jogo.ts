import { IndiceCampo } from "./IndiceCampo";
import { NumeroSorteado } from "./NumeroSorteado";
import { RegrasBingo } from "./RegrasBingo";
import { Tabela } from "./Tabela";

class Jogo {
  private nome: string;
  private readonly dataCriacao: Date;

  public readonly tabela: Tabela;
  public regras: RegrasBingo;

  private numerosSorteados: NumeroSorteado[] = [];
  public getNumerosSorteados(): NumeroSorteado[] {
    return this.numerosSorteados;
  }

  private resultadoBingo = false;

  constructor(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number,
    regra: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ) {
    Jogo.verificarNome(nomeJogo);

    this.nome = nomeJogo;
    this.dataCriacao = new Date();

    this.tabela = new Tabela(quantidadeColunas, quantidadeLinhas);
    this.regras = new RegrasBingo(regra);
  }

  /**
   * Get Functions
   */
  public getNome(): string {
    return this.nome;
  }
  public getDataCriacao(): Date {
    return this.dataCriacao;
  }
  public getResultadoBingo(): boolean {
    return this.resultadoBingo;
  }

  /**
   * Set Functions
   */
  public atualizarNome(nomeNovo: string): void {
    Jogo.verificarNome(nomeNovo);
    this.nome = nomeNovo;
  }

  private static verificarNome(nome: string): void {
    const isVazio = (nome: string): boolean =>
      nome == null || nome == "" || nome == undefined;

    const maximoCaracters = 50;
    const minimoCaracters = 5;

    if (isVazio(nome)) {
      throw new Error("Nome do jogo não pode ser vazio.");
    }
    if (nome.length < minimoCaracters) {
      throw new Error(
        `Nome do jogo deve ter no mínimo ${minimoCaracters} letras.`
      );
    }
    if (nome.length > maximoCaracters) {
      throw new Error(
        `Nome do jogo deve ter no máximo ${maximoCaracters} letras.`
      );
    }
  }

  /**
   * Reseta o status de marcado de todos os campos para valor inicial false
   */
  resetarJogo(): void {
    this.tabela.resetarMarcacaoDeTodosOsCampos();
    this.numerosSorteados = [];
    this.resultadoBingo = false;
  }

  public validarTabelaERegrasParaIniciarJogo(): void {
    this.tabela.validarTabela();
    this.regras.validarRegras();
  }

  private adicionarNumeroSorteado(numeroSorteado: NumeroSorteado): void {
    this.numerosSorteados.push(numeroSorteado);
  }

  public jogarNumero(valorSorteado: string): {
    foiBingo: boolean;
    foiAchado: boolean;
    indiceCampo: IndiceCampo;
  } {
    if (this.resultadoBingo) {
      throw new Error("Jogo já finalizado.")
    }

    /**
     * Verificar se valor sorteado é um número e não está vazio
     */
    NumeroSorteado.verificarNumero(valorSorteado);
    let numeroFoiAchadoNaTabela = false;
    let indiceDoCampoOndeNumeroFoiAchado: IndiceCampo = new IndiceCampo(-1, -1);

    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (
          this.tabela.campos[i][j].getValor() == valorSorteado &&
          !this.tabela.campos[i][j].getMarcado()
        ) {
          this.tabela.campos[i][j].atualizarMarcado(true);
          numeroFoiAchadoNaTabela = true;
          indiceDoCampoOndeNumeroFoiAchado = new IndiceCampo(i, j);
        }
      }
    }

    let novoNumeroSorteado: NumeroSorteado;

    if (numeroFoiAchadoNaTabela) {
      novoNumeroSorteado = new NumeroSorteado(
        valorSorteado,
        numeroFoiAchadoNaTabela,
        indiceDoCampoOndeNumeroFoiAchado
      );
    } else {
      novoNumeroSorteado = new NumeroSorteado(
        valorSorteado,
        numeroFoiAchadoNaTabela
      );
    }

    this.adicionarNumeroSorteado(novoNumeroSorteado);

    let considerouBingo = false;
    if (numeroFoiAchadoNaTabela) {
      considerouBingo = this.verificarSeBingo();
      this.resultadoBingo = considerouBingo;
    }

    return {
      foiBingo: considerouBingo,
      foiAchado: numeroFoiAchadoNaTabela,
      indiceCampo: indiceDoCampoOndeNumeroFoiAchado,
    };
  }

  public desfazerUltimoNumeroJogado() {
    if (this.numerosSorteados.length == 0) {
      return;
    }
    const ultimoNumeroSorteado: NumeroSorteado =
      this.numerosSorteados[this.numerosSorteados.length - 1];

    if (
      ultimoNumeroSorteado.getAchado() &&
      ultimoNumeroSorteado.getIndiceCampo().getX() != -1
    ) {
      this.tabela.campos[ultimoNumeroSorteado.getIndiceCampo().getX()][
        ultimoNumeroSorteado.getIndiceCampo().getY()
      ].atualizarMarcado(false);
    }

    this.numerosSorteados.pop();
  }

  public verificarSeBingo(): boolean {
    let bingoPorTabelaToda = false;
    if (this.regras.getTabelaMarcada()) {
      bingoPorTabelaToda = this.verificarSeBingoPorTabelaToda();
    }

    let bingoPorColuna = false;
    if (this.regras.getColunaMarcada()) {
      bingoPorColuna = this.verificarSeBingoPorColuna();
    }

    // eslint-disable-next-line prefer-const
    let bingoPorLinha = false;
    if (this.regras.getLinhaMarcada()) {
      bingoPorColuna = this.verificarSeBingoPorLinha();
    }

    if (bingoPorTabelaToda || bingoPorColuna || bingoPorLinha) {
      return true;
    }

    return false;
  }

  private verificarSeBingoPorTabelaToda(): boolean {
    let foiBingo = true;
    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            foiBingo = false;
          }
        }
      }
    }
    return foiBingo;
  }

  private verificarSeBingoPorColuna(): boolean {
    let foiBingo = false;
    const colunasMarcadas: boolean[] = [];

    for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
      let colunaTodaMarcada = true;

      for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            colunaTodaMarcada = false;
          }
        }
      }
      colunasMarcadas.push(colunaTodaMarcada);
    }

    const peloMenosUmaLColunaMarcada = (colunas: boolean[]) =>
      colunas.filter((coluna) => coluna).length > 0;

    if (peloMenosUmaLColunaMarcada(colunasMarcadas)) {
      foiBingo = true;
    }
    return foiBingo;
  }

  private verificarSeBingoPorLinha(): boolean {
    let foiBingo = false;
    const linhasMarcadas: boolean[] = [];

    for (let i = 0; i < this.tabela.getQuantidadeLinhas(); i++) {
      let linhaTodaMarcada = true;

      for (let j = 0; j < this.tabela.getQuantidadeColunas(); j++) {
        if (this.tabela.campos[i][j].getConsiderar()) {
          if (!this.tabela.campos[i][j].getMarcado()) {
            linhaTodaMarcada = false;
          }
        }
      }
      linhasMarcadas.push(linhaTodaMarcada);
    }

    const peloMenosUmaLinhaMarcada = (linhas: boolean[]) =>
      linhas.filter((linha) => linha).length > 0;

    if (peloMenosUmaLinhaMarcada(linhasMarcadas)) {
      foiBingo = true;
    }
    return foiBingo;
  }
}

export { Jogo };
