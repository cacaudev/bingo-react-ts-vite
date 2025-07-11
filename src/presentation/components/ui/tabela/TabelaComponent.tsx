import { useState } from "react";
import "./TabelaComponent.css";
import { Campo, Tabela } from "../../../../domain/jogo";
import { CampoComponent } from "../campo/CampoComponent";

interface Props {
  numeroLinhas: number;
  numeroColunas: number;
  editable: boolean;
}

function TabelaComponent(props: Props) {
  const [tabela, setTabela] = useState(new Tabela(3, 3));

  const tableChanged = (campo: Campo) => {
    console.log("campo alterado em");
    console.log("x ", campo.getIndice().getX());
    console.log("y ", campo.getIndice().getY());
    console.log("VALOR ", campo.getValor());
  };

  return (
    <>
      <table>
        <tbody>
          {tabela.campos.map((linha) => {
            return (
              <tr>
                {linha.map((campo) => (
                  <td>
                    <CampoComponent
                      valor={campo.getValor()}
                      marcado={campo.getMarcado()}
                      x={campo.getIndice().getX()}
                      y={campo.getIndice().getX()}
                      editable={props.editable}
                      changeCallback={tableChanged}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export { TabelaComponent };
