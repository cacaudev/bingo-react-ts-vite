import { Link } from "react-router-dom"

function Table() {
  return (
    <>      
      <h1>Tabela Jogo</h1>

      <div>
         Complete sua tabela:


        <Link to="/config">
          <button type="button">Voltar</button>
        </Link>
        <Link to="/game">
          <button type="button">Próximo</button>
        </Link>
      </div>
    </>
  )
}

export { Table }
