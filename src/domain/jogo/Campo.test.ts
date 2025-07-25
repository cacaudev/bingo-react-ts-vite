import { Campo } from "./Campo";
import { IndiceCampo } from "./IndiceCampo";

describe('Campo', () => {
  test('Deveria criar novo Campo com valor texto', (done) => {
    const aCampo = new Campo(new IndiceCampo(0,1), 'estrela', false, false);
    expect(aCampo.getIndice()).toStrictEqual(new IndiceCampo(0, 1));
    expect(aCampo.getValor()).toBe('estrela');
    expect(aCampo.getMarcado()).toBe(true);
    expect(aCampo.getConsiderar()).toBe(false);
    done();
  });

  test('Deveria criar novo Campo com valor número', (done) => {
    const aCampo = new Campo(new IndiceCampo(0,2), "32", true);
    expect(aCampo.getIndice()).toStrictEqual(new IndiceCampo(0, 2));
    expect(aCampo.getValor()).toBe("32");
    expect(aCampo.getMarcado()).toBe(true);
    expect(aCampo.getConsiderar()).toBe(true);
    done();
  });
});