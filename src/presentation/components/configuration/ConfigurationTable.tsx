import { Link } from "react-router-dom";

function ConfigurationTable() {
  return (
    <>
      <h1>Configuração Tabela</h1>
      <br />

      <div>
        Selecione uma configuração para o jogo:
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
        <Link to="/table">
          <button type="button">Próximo</button>
        </Link>
      </div>
    </>
  );
}

export { ConfigurationTable };
