import "./Button.css";

interface Props {
  onClick?: any;
  role: "primary" | "secondary";
  text: string;
}

function Button(props: Props) {
  return (
    <button
      className="button-82-pushable"
      role="button"
      onClick={props.onClick}
    >
      <span className="button-82-shadow"></span>
      <span className={"button-82-edge"}></span>
      <span className={"button-82-front text" + " " + props.role}>{props.text}</span>
    </button>
  );
}

export { Button };
