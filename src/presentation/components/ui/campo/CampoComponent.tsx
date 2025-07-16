import { useEffect, useState } from "react";
import { Campo, IndiceCampo } from "../../../../domain/jogo";
import "./CampoComponent.css";
import Form from "react-bootstrap/Form";

interface Props {
  key: string;
  campoProps: Campo;
  editable: boolean;
  changeFieldCallback?: (campoEditado: Campo) => void;
}

function CampoComponent(props: Props) {
  const [campo, setCampo] = useState<Campo>(
    new Campo(new IndiceCampo(0, 0), "*")
  );

  const getBordaCampoCor = () =>
    props.campoProps.getMarcado() ? "red" : "blue";

  useEffect(() => {
    if (props.campoProps != null) {
      setCampo(
        new Campo(
          new IndiceCampo(
            props.campoProps.getIndice().getX(),
            props.campoProps.getIndice().getY()
          ),
          props.campoProps.getValor(),
          props.campoProps.getMarcado(),
          props.campoProps.getConsiderar()
        )
      );
    }
  }, []);

  const onChange = (event: any) => {
    if (props.editable) {
      if (props.changeFieldCallback == undefined) {
        throw new Error(
          "Função de callback para alteração no campo não setada."
        );
      }

      if (campo != null) {
        campo.atualizarValor(event.target.value.toString());
        props.changeFieldCallback(campo);
      }
    }
  };

  return (
    <>
      {props.editable ? (
        <Form.Control
          key={props.key}
          className="c-campo"
          type="number"
          placeholder="*"
          max={500}
          min={0}
          onBlur={onChange}
        />
      ) : (
        <div className="c-campo" style={{ borderColor: getBordaCampoCor() }}>
          <p>{props.campoProps.getValor()}</p>
        </div>
      )}
    </>
  );
}

export { CampoComponent };
