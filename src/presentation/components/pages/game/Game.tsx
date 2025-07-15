import { useEffect, useState } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import { TabelaComponent } from "../../ui/tabela/TabelaComponent";
import { Form } from "react-bootstrap";
import { NumeroSorteado } from "../../../../domain/jogo";

function Game() {
  const { game } = useGameContext();
  const [numeroSorteado, setNumeroSorteado] = useState<number>(0);
  const [numerosSorteadosString, setNumerosSorteadosString] = useState<string>("");
  const [estadoNumeroSorteado, setEstadoNumeroSorteado] = useState<"ENCONTRADO" | "NAO_ENCONTRADO" | null>(null);
  const [bingo, setBingo] = useState<boolean>(false);

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
    const { foiAchado, foiBingo } = game.jogarNumero(numeroSorteado.toString());
    atualizarNumerosSorteadosView();
    if (foiBingo) {
      setBingo(true);
    }

    setEstadoNumeroSorteado(foiAchado ? "ENCONTRADO" : "NAO_ENCONTRADO");
    setTimeout(() => {
      setEstadoNumeroSorteado(null);
    }, 5000)
    
  };

  const atualizarNumerosSorteadosView = () => {
    const novaView: string = game.
      getNumerosSorteados().map((numero: NumeroSorteado) => numero.getValor()).join(", ");
    setNumerosSorteadosString(novaView);
  }

  return (
    <>
      <h1>Hora de jogar!</h1>
      <br />
      <h2>Jogo: {game?.getNome()}</h2>
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
            textAlign: "initial",
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
              disabled={bingo}
              onKeyDown={(event) => event.key==='.' ? event.preventDefault(): null}
            />
            <button
              type="button"
              onClick={jogarNumero}
              style={{ backgroundColor: "red" }}
              disabled={bingo}
            >
              Jogar número
            </button>           
          </div>

          <p>{estadoNumeroSorteado != null && (<> Último número sorteado:  {estadoNumeroSorteado}</> )}</p>

          <div>
            <h3>Números jogados:</h3>
            <h5>{numerosSorteadosString}</h5>
          </div>

          <br />

          <div>
            {bingo && (<h1>Bingo!!!</h1>)}            
          </div>

        </div>
      </div>
      <br />
    </>
  );
}

export { Game };
