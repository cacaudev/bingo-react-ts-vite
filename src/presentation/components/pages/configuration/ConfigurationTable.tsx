/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useGameContext } from "../../../../infrastructure/state/context/GameContex";
import "./ConfigurationTable.css";
import { Button } from "../../ui/button/Button";

const tamanhoTabelas: { id: number; nome: string; value: number }[] = [
  {
    id: 1,
    nome: "3x3",
    value: 3,
  },
  { id: 2, nome: "5x5", value: 5 },
];

const regrasBingo: { id: number; nome: string; value: string }[] = [
  {
    id: 3,
    nome: "Quando todos os números da tabela são marcados",
    value: "TABELA",
  },
  { id: 1, nome: "Quando uma linha inteira é marcada", value: "LINHA" },
  { id: 2, nome: "Quando uma coluna inteira é marcada", value: "COLUNA" },
];

function ConfigurationTable() {
  const [tamanho, setTamanho] = useState(tamanhoTabelas[0].value);
  const [regra, setRegra] = useState(regrasBingo[0].value);
  const [nomeJogo, setNomeJogo] = useState("Jogo #1");

  const { startGame } = useGameContext();

  const navigate = useNavigate();

  const onNomeChange = (event: any) => {
    setNomeJogo(event.target.value);
  };

  const onTamanhoChange = (event: any) => {
    setTamanho(event.target.value);
  };

  const onRegraChange = (event: any) => {
    setRegra(event.target.value);
  };

  const criarJogo = () => {
    startGame(
      nomeJogo,
      tamanho,
      tamanho,
      regra as "LINHA" | "COLUNA" | "TABELA"
    );
    navigate("/table");
  };

  const voltar = () => {
    navigate("/");
  }

  return (
    <>
      <div>
        <h3>Selecione as configurações para o jogo:</h3>

        <br />

        <Form.Label htmlFor="inputPassword5">Nome Jogo:</Form.Label>
        <Form.Control
          type="text"
          id="nomeJogo"
          value={nomeJogo}
          onChange={onNomeChange}
        />

        <br />

        <Form.Label htmlFor="tamanhoTabela">Tamanho tabela:</Form.Label>
        <Form.Select
          size="lg"
          id="tamanhoTabela"
          onChange={onTamanhoChange}
          value={tamanho}
        >
          {tamanhoTabelas.map((tamanho) => (
            <option value={tamanho.value}>{tamanho.nome}</option>
          ))}
        </Form.Select>

        <br />

        <Form.Label htmlFor="regrasJogo">
          Regra para ser considerado bingo:
        </Form.Label>
        <Form.Select
          size="lg"
          id="regrasJogo"
          onChange={onRegraChange}
          value={regra}
        >
          {regrasBingo.map((tamanho) => (
            <option value={tamanho.value}>{tamanho.nome}</option>
          ))}
        </Form.Select>

        <br />

        <div className="c-config-table__buttons">
          <Button
            onClick={voltar}
            text={"Voltar"}
            role={"secondary"}
          />

          <Button
            onClick={criarJogo}
            text={"Próximo"}
            role={"primary"}
          />
        </div>
      </div>
    </>
  );
}

export { ConfigurationTable };
