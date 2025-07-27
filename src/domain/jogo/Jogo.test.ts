import { Campo } from "./Campo";
import { IndiceCampo } from "./IndiceCampo";
import { Jogo } from "./Jogo";
import { RegrasBingo } from "./RegrasBingo";
import { Tabela } from "./Tabela";

describe("Jogo", () => {
  test("Deveria criar um novo jogo", (done) => {
    const aJogo = new Jogo("Teste", 2, 3);
    expect(aJogo.getNome()).toBe("Teste");
    expect(aJogo.regras).toStrictEqual(new RegrasBingo());
    expect(aJogo.tabela).toStrictEqual(new Tabela(2, 3));
    expect(aJogo.getNumerosSorteados()).toStrictEqual([]);
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo para tabela toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.regras.atualizarTabelaMarcada(true);
    aJogo.validarTabelaERegrasParaIniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("56");
    aJogo.jogarNumero("0");
    aJogo.jogarNumero("78");
    aJogo.jogarNumero("12");

    expect(aJogo.getResultadoBingo()).toBe(true);
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo para uma linha toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.regras.atualizarLinhaMarcada(true);
    aJogo.validarTabelaERegrasParaIniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("4");
    aJogo.jogarNumero("78");

    expect(aJogo.getResultadoBingo()).toBe(true);
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo uma coluna toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.tabela.atualizarCampo(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.regras.atualizarColunaMarcada(true);
    aJogo.validarTabelaERegrasParaIniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("2");
    aJogo.jogarNumero("56");

    expect(aJogo.getResultadoBingo()).toBe(true);
    done();
  });
});
