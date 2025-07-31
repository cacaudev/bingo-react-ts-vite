import { Toast, ToastContainer } from "react-bootstrap";
import { useToastContext } from "../../../../infrastructure/state/context/ToastContext";

function ToastAlert() {
  const { message, removeAlert } = useToastContext();

  const getColorVariant = (role: string | undefined): string => {
    if (role == undefined) return "";
    switch (role) {
      case "SUCCESS":
        return "Success";
      case "ERROR":
        return "Danger";
      default:
        return "Primary";
    }
  };

  const getTitle = (role: string | undefined): string => {
    if (role == undefined) return "";
    switch (role) {
      case "SUCCESS":
        return "Sucesso";
      case "ERROR":
        return "Erro";
      default:
        return "Atenção";
    }
  };

  return (
    <ToastContainer position={"top-end"} style={{ zIndex: 1006, margin: "1em" }}>
      <Toast
        onClose={() => removeAlert()}
        show={message != null}
        delay={3000}
        bg={getColorVariant(message?.role).toLowerCase()}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{getTitle(message?.role)}</strong>
        </Toast.Header>
        <Toast.Body
          style={{ textAlign: "left" }}
          className={"text-white"}
        >
          {message?.text}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export { ToastAlert };
