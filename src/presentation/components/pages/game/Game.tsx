import { useEffect, useState } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import { Form } from "react-bootstrap";

function Game() {
  const { game } = useGameContext();
  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [numerosSorteados, setNumerosSorteados] = useState<number[]>([]);
  const [numerosString, setNumerosString] = useState<string>("");

  useEffect(() => {
    if (game != null) {
      console.log("nome jogo ", game.getNome());
      console.log("nome data ", game.getDataCriacao());
      console.log("nome jogo e data ", game.tabela.getQuantidadeCamposTabela());
    }
  }, [game]);

  const changedNumeroSorteado = (event: any): void => {
    setNumeroSorteado(event.target.value);
  };

  const jogarNumero = () => {
    const numeros: number[] = numerosSorteados;
    numeros.push(numeroSorteado);
    setNumerosSorteados(numeros);
    setNumerosString(numeros.join(", "));
  };

  return (
    <>
      <h1>Game!</h1>
      <br />
      <h1>Jogo: {game?.getNome()}</h1>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        <TabelaComponent tabela={game?.tabela} editable={false} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "baseline",
            alignItems: "flex-start",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Form.Control
              type="number"
              id="numeroJogado"
              onChange={changedNumeroSorteado}
              value={numeroSorteado}
            />
            <button
              type="button"
              onClick={jogarNumero}
              style={{ backgroundColor: "red" }}
            >
              Jogar número
            </button>
          </div>

          <div>
            <h3>Números jogados:</h3>
            <h5>{numerosString}</h5>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export { Game };
