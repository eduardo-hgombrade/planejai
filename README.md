# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # PlanejAI

  ## O que o projeto faz

  Eu desenvolvi o PlanejAI para ajudar no planejamento de metas financeiras de forma simples e orientada por dados.

  A aplicação coleta a renda mensal, os custos fixos, as dívidas, o nome da meta, o custo e o prazo desejado. Com essas informações, eu consigo visualizar a economia mensal necessária e receber um diagnóstico financeiro personalizado com inteligência artificial.

  Também posso consultar o histórico de simulações, abrir novamente os resultados, excluir registros e conversar com um Educador Financeiro sobre cada planejamento.

  Este projeto foi baseado no curso **Santander 2026 - AI React Front-end**, em parceria com a **Dio.me**.

  **Aluno:** Eduardo Hennes Gombrade

  ## Como executar a aplicação

  ### Pré-requisitos

  - Node.js;
  - pnpm;
  - Uma chave de API do Google Gemini para gerar os insights e usar o Educador Financeiro.

  ### Passo a passo

  1. Clone o repositório:

  ```bash
  git clone https://github.com/eduardo-hgombrade/planejai.git
  ```

  2. Entre na pasta do projeto:

  ```bash
  cd planejai
  ```

  3. Instale as dependências:

  ```bash
  pnpm install
  ```

  4. Crie o arquivo `.env.local` na raiz do projeto e informe sua chave:

  ```env
  VITE_GEMINI_API_KEY=sua_chave_da_api_gemini
  ```

  5. Inicie o servidor de desenvolvimento:

  ```bash
  pnpm dev
  ```

  6. Abra no navegador a URL informada pelo Vite, normalmente `http://localhost:5173`.

  Sem a chave do Gemini, o fluxo de preenchimento, cálculo e histórico continua disponível, mas os insights e o chat não poderão consultar a inteligência artificial.

  ## Tecnologias utilizadas

  - React 19;
  - TypeScript;
  - Vite;
  - React Router;
  - Tailwind CSS;
  - Lucide React;
  - Google Gemini API;
  - LocalStorage;
  - React Loading Skeleton;
  - ESLint e Prettier;
  - pnpm.

  ## Qual melhoria eu implementei

  Eu implementei um histórico persistente de simulações usando `localStorage`. Assim, os dados não ficam restritos à tela atual e podem ser consultados novamente depois.

  Além disso, acrescentei a integração com o Google Gemini para gerar um diagnóstico estruturado com:

  - Análise de viabilidade da meta;
  - Diagnóstico financeiro;
  - Sugestões práticas;
  - Ideias para aumentar a renda;
  - Sugestões de investimento;
  - Mensagem final personalizada.

  Na mesma tela de resultados, também implementei um chat com o Educador Financeiro. As mensagens da conversa são salvas junto com a simulação e podem ser recuperadas posteriormente.

  ## Como testar o fluxo principal

  1. Execute `pnpm dev` e acesse a aplicação.
  2. Preencha as seis etapas do formulário:
     - renda mensal bruta;
     - custos fixos de vida;
     - dívidas ou parcelas;
     - nome da meta;
     - custo da meta;
     - prazo desejado.
  3. Clique em **Gerar simulação**.
  4. Confira o custo da meta, o prazo, a economia mensal necessária, a renda, os custos fixos e as dívidas.
  5. Com o Gemini configurado, aguarde o diagnóstico e faça uma pergunta no chat do Educador Financeiro.
  6. Acesse a página de histórico para verificar se a simulação foi salva.
  7. Abra novamente os detalhes ou exclua o registro para testar as operações do histórico.

  ## Comandos disponíveis

  ```bash
  # Ambiente de desenvolvimento
  pnpm dev

  # Verificação do ESLint
  pnpm lint

  # Build de produção
  pnpm build

  # Pré-visualização do build
  pnpm preview
  ```

  ## O que eu aprendi durante o desafio

  Durante o desafio, eu aprendi a estruturar uma aplicação React com componentes reutilizáveis, rotas e tipagem com TypeScript.

  Também aprendi a:

  - criar um formulário dividido em etapas;
  - controlar e validar dados preenchidos pelo usuário;
  - calcular valores financeiros a partir das entradas;
  - persistir dados com `localStorage`;
  - organizar páginas, componentes, hooks, serviços e utilitários;
  - integrar uma aplicação React com a API do Google Gemini;
  - criar prompts para diagnóstico e conversação;
  - tratar estados de carregamento e erros de uma API;
  - usar skeleton loading para melhorar a experiência durante o carregamento;
  - preservar o histórico de mensagens entre o usuário e o Educador Financeiro;
  - construir uma interface responsiva e acessível.

  Esse desenvolvimento me ajudou a entender melhor como combinar React, TypeScript e inteligência artificial para criar uma aplicação útil, interativa e voltada para uma necessidade real.
