import { useEffect } from "react";
import { Campo, IndiceCampo, type ValorCampo } from "../../../../domain/jogo";
import "./CampoComponent.css";
import Form from "react-bootstrap/Form";

interface Props {
  valor: ValorCampo;
  marcado: boolean;
  x: number;
  y: number;
  editable: boolean;
  changeCallback: (campoEditado: Campo) => void;
}

function CampoComponent(props: Props) {
  const getBordaCampoCor = () => (props.marcado ? "red" : "blue");

  useEffect(() => {}, []);

  const onChange = (event: any) => {
    const campoAlterado = new Campo(
      new IndiceCampo(props.x, props.y),
      event.target.value,
      props.editable ? props.marcado : false,
      true
    );
    props.changeCallback(campoAlterado);
  };

  return (
    <>
      {props.editable ? (
        <Form.Control
          className="c-campo"
          type="number"
          placeholder="*"
          max={500}
          min={0}
          onChange={onChange}
        />
      ) : (
        <div className="c-campo" style={{ borderColor: getBordaCampoCor() }}>
          <p>{props.valor}</p>
        </div>
      )}
    </>
  );
}

export { CampoComponent };
