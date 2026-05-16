# Instruções do Projeto

Este projeto é uma plataforma de gerenciamento de livros e descoberta literária que consome a API do Google Books.

## Por que este projeto?

O motivo da escolha deste projeto foi a oportunidade de criar algo distinto dos desafios técnicos convencionais. Enquanto projetos que consomem APIs como a do TMDB (filmes) são comuns, o Google Books oferece uma estrutura rica para trabalhar com paginação complexa (Infinite Scroll), persistência de dados (Estante pessoal) e uma interface focada em conteúdo textual e metadados, o que permitiu um exercício mais profundo de UI/UX e arquitetura.

---

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local.

### 1. Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm

### 2. Obtenção da Google API Key
Para que as buscas funcionem sem interrupções por limites de requisição, você precisará de uma chave de API:
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto ou selecione um existente.
3. Vá em **APIs e Serviços > Biblioteca** e ative a **Google Books API**.
4. Em **APIs e Serviços > Credenciais**, clique em **Criar Credenciais > Chave de API**.
5. Copie a chave gerada.

### 3. Configuração do Ambiente
1. Na raiz do projeto, você encontrará um arquivo chamado `.env.example`.
2. Crie um novo arquivo chamado `.env.local` na raiz do projeto.
3. Copie o conteúdo de `.env.example` para dentro do seu `.env.local`.
4. Substitua o valor da variável pela chave que você obteve no passo anterior:
   ```env
   VITE_GOOGLE_API_KEY=SUA_CHAVE_AQUI
   ```

### 4. Instalação e Execução
No seu terminal, execute os seguintes comandos:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Tecnologias Principais
- **React 18** + **Vite**
- **TanStack Router** (Roteamento Type-safe)
- **TanStack Query** (Gerenciamento de Cache e Estados de Servidor)
- **Zustand** (Estado Global e Persistência)
- **Tailwind CSS v4** + **Shadcn/ui** (Estilização)
- **Biomes** (Linting e Formatação)
