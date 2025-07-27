/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndiceCampo } from "./IndiceCampo";

describe("Índice Campo", () => {
  test("Deveria criar novo índice", (done) => {
    const aCampo = new IndiceCampo(0, 0);
    expect(aCampo.getX()).toBe(0);
    expect(aCampo.getY()).toBe(0);
    done();
  });

  test("Deveria retornar erro ao tentar criar índice com x negativo", (done) => {
    expect.assertions(1);
    try {
      new IndiceCampo(-2, 5);
    } catch (error: any) {
      expect(error.message).toBe(
        "Atributo indice do campo não pode estar vazio ou ser negativo."
      );
    }
    done();
  });

  test("Deveria retornar erro ao tentar criar índice com y negativo", (done) => {
    expect.assertions(1);
    try {
      new IndiceCampo(1, -4);
    } catch (error: any) {
      expect(error.message).toBe(
        "Atributo indice do campo não pode estar vazio ou ser negativo."
      );
    }
    done();
  });
});