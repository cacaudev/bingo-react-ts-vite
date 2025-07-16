import { useEffect, useState } from "react";
import "./TabelaComponent.css";
import { Campo, Tabela } from "../../../../domain/jogo";
import { CampoComponent } from "../campo/CampoComponent";

interface Props {
  tabela: Tabela;
  editable: boolean;
  considerarCampoMeio: boolean;
  changeTableCallback?: (campoEditado: Campo) => void;
}

function TabelaComponent(props: Props) {
  const [tabela, setTabela] = useState<Tabela>(props.tabela);

  const fieldChanged = (campo: Campo) => {
    if (props.editable) {
      if (props.changeTableCallback == undefined) {
        throw new Error(
          "Função de callback para alteração na tabela não setada."
        );
      }
      props.changeTableCallback(campo);
    }
  };

  useEffect(() => {
    campoMeioAlterado(props.considerarCampoMeio);
  }, [props.considerarCampoMeio]);

  const campoMeioAlterado = (considerarMarcado: boolean) =>
    tabela.estadoCampoMeioNulo(considerarMarcado);

  return (
    <div className="c-tabela">
      <table>
        <tbody>
          {tabela?.campos.map((linha) => {
            return (
              <tr>
                {linha.map((campo) => (
                  <td>
                    <CampoComponent
                      key={
                        "campo_x_" +
                        campo.getIndice().getX() +
                        "_y_" +
                        campo.getIndice().getY()
                      }
                      campoProps={campo}
                      editable={campo.getConsiderar() ? props.editable : false}
                      changeFieldCallback={fieldChanged}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { TabelaComponent };
