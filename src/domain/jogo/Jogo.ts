import { IndiceCampo } from "./IndiceCampo";
import { NumeroSorteado } from "./NumeroSorteado";
import { RegrasBingo } from "./RegrasBingo";
import { Tabela } from "./Tabela";
import type { Campo, ValorCampo } from "./Campo";

export type JogoStatus =
  | "JOGO_NAO_INICIADO"
  | "JOGO_CRIADO" // Jogo foi criado mas tabela não foi preenchida
  | "PREENCHENDO_TABELA" // Pelo menos um número foi preenchido na tabela
  | "JOGO_EM_ANDAMENTO" // Pelo menos um número foi sorteado
  | "BINGO"; // Todos os números da tabela foram sorteados e marcados

class Jogo {
  private nome: string;
  private dataCriacao: Date;

  private readonly tabela: Tabela;
  private campoDoMeioTabelaENulo: boolean = true;

  private readonly regras: RegrasBingo;

  private numerosSorteados: NumeroSorteado[] = [];

  private status: JogoStatus;

  private constructor(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number,
    regra: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ) {
    this.validarNome(nomeJogo);

    this.nome = nomeJogo;
    this.dataCriacao = new Date();

    this.tabela = new Tabela(quantidadeColunas, quantidadeLinhas);
    this.regras = new RegrasBingo(regra);
    this.status = "JOGO_CRIADO";
  }

  public static createDefault(): Jogo {
    const novoJogo = new Jogo("Jogo Teste", 2, 2, "TABELA");
    novoJogo.status = "JOGO_NAO_INICIADO";
    return novoJogo;
  }

  public static createCustom(
    nomeJogo: string,
    quantidadeColunas: number,
    quantidadeLinhas: number,
    regra: "LINHA" | "COLUNA" | "TABELA" = "TABELA"
  ): Jogo {
    return new Jogo(nomeJogo, quantidadeColunas, quantidadeLinhas, regra);
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
  public getStatus(): JogoStatus {
    return this.status;
  }
  public getNumerosSorteados(): NumeroSorteado[] {
    return this.numerosSorteados;
  }
  public getEstadoNumeroDoMeioTabelaSeNulo(): boolean {
    return this.campoDoMeioTabelaENulo;
  }

  /**
   * Apenas para rendering direto, não pode ser usada fora
   * desse cenário pois não alterará o status direto do jogo
   */
  public getTabela(): Tabela {
    return this.tabela;
  }

  /**
   * Set Functions
   */

  public atualizarNome(nomeNovo: string): void {
    if (!this.sePodeAtualizarDadosJogo()) {
      throw new Error(
        "Não é possível alterar nome caso jogo já esteja em andamento ou finalizado."
      );
    }
    this.validarNome(nomeNovo);
    this.nome = nomeNovo;
  }

  public setDataCriacao(novaData: Date): void {
    this.dataCriacao = novaData;
  }

  /**
   * Fases do jogo dependendo do status e dados
   */
  private seNaoIniciado() {
    return (this.status = "JOGO_NAO_INICIADO");
  }
  private seFaseInicial() {
    return this.status == "JOGO_CRIADO";
  }
  private seFasePreenchimento() {
    return this.status == "PREENCHENDO_TABELA";
  }
  private seFaseJogoAndamento() {
    return this.status == "JOGO_EM_ANDAMENTO";
  }
  private seFaseJogoConcluido() {
    return this.status == "BINGO";
  }

  /**
   * Regras do jogo dependendo do status
   */

  /**
   * Dados: Nome ou regras
   */
  private sePodeAtualizarDadosJogo(): boolean {
    return this.seFaseInicial();
  }

  /**
   * Funções de validação
   */

  private validarNome(nome: string): void {
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
   * Funções públicas do jogo
   */

  /**
   * Reseta o status de marcado de todos os campos para valor inicial false,
   * não altera o valor dos campos.
   */
  public reiniciarJogoEmAndamento(): void {
    this.tabela.resetarMarcacaoDeTodosOsCampos();
    this.numerosSorteados = [];
    this.status = "JOGO_EM_ANDAMENTO";
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
    if (!this.seFaseJogoAndamento()) {
      throw new Error(
        "Não é possível jogar número caso o jogo já esteja finalizado ou na fase de preenchimento de tabela."
      );
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

      if (considerouBingo) {
        this.status = "BINGO";
      }
    }

    return {
      foiBingo: considerouBingo,
      foiAchado: numeroFoiAchadoNaTabela,
      indiceCampo: indiceDoCampoOndeNumeroFoiAchado,
    };
  }

  public verificarSeBingoEAtualizar(): void {
    if (this.seFaseJogoAndamento()) {
      const considerouBingo = this.verificarSeBingo();
      if (considerouBingo) {
        this.status = "BINGO";
      }
    }
  }

  public desfazerUltimoNumeroJogado() {
    if (this.seFaseJogoConcluido()) {
      throw new Error("Jogo já finalizado.");
    }
    if (!this.seFaseJogoAndamento()) {
      throw new Error(
        "Não é possível desfazer um número sorteado se jogo não foi inicializado."
      );
    }

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

  public iniciarJogo() {
    this.validarTabelaERegrasParaIniciarJogo();
    this.status = "JOGO_EM_ANDAMENTO";
  }

  /**
   * Funções regras internas do jogo de bingo
   */

  private verificarSeBingo(): boolean {
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

  /**
   * Funções da interface da tabela
   */

  // Tamanho Tabela
  public getQuantidadeCamposTabela(): number {
    return this.tabela.getQuantidadeCamposTabela();
  }
  public getQuantidadeColunas(): number {
    return this.tabela.getQuantidadeColunas();
  }
  public getQuantidadeLinhas(): number {
    return this.tabela.getQuantidadeLinhas();
  }

  // Validação tabela

  public getTabelaValidada(): boolean {
    return this.tabela.getTabelaValidada();
  }
  public validarTabela(): void {
    this.tabela.validarTabela(); // Pode emitir erro
  }

  // Campos

  public verificarSeValorExisteNaTabela(
    valorCampo: ValorCampo,
    indiceCampo: IndiceCampo
  ): boolean {
    return this.tabela.verificarSeValorJaExisteNaTabela(
      valorCampo,
      indiceCampo
    );
  }

  // Preenchimento tabela

  public atualizarCampoTabela(campoAtualizado: Campo): void {
    if (!this.seFaseInicial() && !this.seFasePreenchimento()) {
      throw new Error(
        "Não é possível alterar valor de campo da tabela após jogo ter sido iniciado."
      );
    }

    this.tabela.atualizarCampo(campoAtualizado); // Pode emitir erro

    if (this.status != "PREENCHENDO_TABELA") {
      this.status = "PREENCHENDO_TABELA";
    }
  }
  public alterarEstadoCampoDoMeioTabela(
    considerarComoNulo: boolean = true
  ): void {
    this.tabela.estadoCampoMeioNulo(considerarComoNulo);
    this.campoDoMeioTabelaENulo = considerarComoNulo;
  }

  /**
   * Funções da interface da regras
   */

  public getRegras(): {
    linhaMarcada: boolean;
    linhaColunaMarcada: boolean;
    tabelaMarcada: boolean;
  } {
    return {
      linhaMarcada: this.regras.getLinhaMarcada(),
      linhaColunaMarcada: this.regras.getColunaMarcada(),
      tabelaMarcada: this.regras.getTabelaMarcada(),
    };
  }

  public atualizarRegraLinhaMarcada(regraAtualizada: boolean): void {
    if (!this.sePodeAtualizarDadosJogo()) {
      throw new Error(
        "Não é possível alterar regra caso o jogo já esteja em andamento ou finalizado."
      );
    }
    this.regras.atualizarLinhaMarcada(regraAtualizada);
  }
  public atualizarRegraColunaMarcada(regraAtualizada: boolean): void {
    if (!this.sePodeAtualizarDadosJogo()) {
      throw new Error(
        "Não é possível alterar regra caso o jogo já esteja em andamento ou finalizado."
      );
    }
    this.regras.atualizarColunaMarcada(regraAtualizada);
  }
  public atualizarRegraTabelaMarcada(regraAtualizada: boolean): void {
    if (!this.sePodeAtualizarDadosJogo()) {
      throw new Error(
        "Não é possível alterar regra caso o jogo já esteja em andamento ou finalizado."
      );
    }
    this.regras.atualizarTabelaMarcada(regraAtualizada);
  }
}

export { Jogo };
