/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Button.css";

interface Props {
  onClick?: any;
  role: "primary" | "secondary";
  text: string;
}

function Button(props: Props) {
  return (
    <a
      className={"button-custom" + " " + props.role}
      role="button"
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
}

export { Button };
