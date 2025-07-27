import { Campo } from "./Campo";
import { IndiceCampo } from "./IndiceCampo";
import { Jogo } from "./Jogo";

describe("Jogo", () => {
  test("Deveria criar um novo jogo", (done) => {
    const aJogo = new Jogo("Teste", 2, 3);
    expect(aJogo.getNome()).toBe("Teste");
    expect(aJogo.getRegras()).toStrictEqual({
      linhaMarcada: false,
      linhaColunaMarcada: false,
      tabelaMarcada: true,
    });
    expect(aJogo.getNumerosSorteados()).toStrictEqual([]);
    expect(aJogo.getStatus()).toBe("JOGO_CRIADO");
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo para tabela toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.atualizarRegraTabelaMarcada(true);

    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.validarTabelaERegrasParaIniciarJogo();
    aJogo.iniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("56");
    aJogo.jogarNumero("0");
    aJogo.jogarNumero("78");
    aJogo.jogarNumero("12");

    expect(aJogo.getStatus()).toBe("BINGO");
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo para uma linha toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.atualizarRegraLinhaMarcada(true);

    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.validarTabelaERegrasParaIniciarJogo();
    aJogo.iniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("4");
    aJogo.jogarNumero("78");

    expect(aJogo.getStatus()).toBe("BINGO");
    done();
  });

  test("Deveria criar um novo jogo e resultar em bingo uma coluna toda marcada", (done) => {
    const aJogo = new Jogo("Teste", 2, 2);
    aJogo.atualizarRegraColunaMarcada(true);

    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 0), "23"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(0, 1), "78"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 0), "56"));
    aJogo.atualizarCampoTabela(new Campo(new IndiceCampo(1, 1), "12"));

    aJogo.validarTabelaERegrasParaIniciarJogo();
    aJogo.iniciarJogo();

    aJogo.jogarNumero("1");
    aJogo.jogarNumero("23");
    aJogo.jogarNumero("2");
    aJogo.jogarNumero("56");

    expect(aJogo.getStatus()).toBe("BINGO");
    done();
  });
});
