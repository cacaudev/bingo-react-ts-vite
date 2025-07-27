import { Tabela } from "./Tabela";

describe('Tabela', () => {
  test('Deveria criar nova Tabela válida', (done) => {
    const aTabela = new Tabela(3,2);
    expect(aTabela.getQuantidadeCamposTabela()).toBe(6);
    expect(aTabela.getQuantidadeColunas()).toBe(3);
    expect(aTabela.getQuantidadeLinhas()).toBe(2);
    expect(aTabela.getTabelaValidada()).toBe(false)
    done();
  });
});