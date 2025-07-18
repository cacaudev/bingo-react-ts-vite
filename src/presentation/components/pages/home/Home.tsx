import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button/Button";

function Home() {
  const navigate = useNavigate();

  const irParaConfiguracao = () => {
    navigate("/config");
  };

  return (
    <Button onClick={irParaConfiguracao} text={"Criar Jogo"} role={"primary"} />
  );
}

export { Home };
