/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./TabelaComponent.css";
import { Campo, Tabela } from "../../../../domain/jogo";
import { CampoComponent } from "../campo/CampoComponent";
import { useToastContext } from "../../../../infrastructure/state/context/ToastContext";

interface Props {
  tabela: Tabela;
  editable: boolean;
  considerarCampoMeio: boolean;
  changeTableCallback?: (campoEditado: Campo) => void;
}

function TabelaComponent(props: Props) {
  const [tabela, setTabela] = useState<Tabela>(props.tabela);
  const { addAlert } = useToastContext();

  const fieldChanged = (campo: Campo) => {
    if (!props.editable) {
      return;
    }

    if (
      props.changeTableCallback == undefined ||
      props.changeTableCallback == null
    ) {
      addAlert("Favor atualizar página.", "ERROR");
      console.log("Função de callback para alteração na tabela não setada.");
      return;
    }

    if (
      tabela.verificarSeValorJaExisteNaTabela(
        campo.getValor(),
        campo.getIndice()
      )
    ) {
      addAlert("Valor já existe na tabela.", "ERROR");
      return;
    }
    props.changeTableCallback(campo);
  };

  useEffect(() => {
    campoMeioAlterado(props.considerarCampoMeio);
  }, [props.considerarCampoMeio]);

  const campoMeioAlterado = (considerarMarcado: boolean) => {
    if (tabela != null && tabela != undefined) {
      tabela.estadoCampoMeioNulo(considerarMarcado);
    }
  };

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
