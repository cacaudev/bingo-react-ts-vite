[PT-BR]

# Bingo Player App (React + TypeScript + Vite)
Projeto de estudo onde um usuário pode construir uma folha de bingo online a partir de uma já pronta e jogar o bingo de maneira mais automatizada.

## Roadmap

- Implementar lógica de domínio utilizando DDD (Domain Driven Design)

- Separar contextos

- Implementar testes automatizados para camada de domínio

- Implementar interface usando React com Typescript, ViteJS

- Implementar documentação de componentes via Storybook

## Funcionalidades
- Preview em tempo real na documentação via Storyboook
- Criar tabela de jogo customizada
- Parâmetros para ser considerado bingo:
  - Pelo menos uma linha marcada
  - Pelo menos uma coluna marcada
  - Tabela toda marcada
- Aviso de Bingo em tempo real ao completar um tabela usando os parâmetros de bingo selecionados
- Salvar jogo em local storage do navegador

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/cacaudev/bingo-react-ts-vite.git
```

Entre no diretório do projeto

```bash
  cd bingo-react-ts-vite
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

Inicie a build

```bash
  npm run build
```
## Rodando os testes
Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Licença

[MIT](https://choosealicense.com/licenses/mit/)
