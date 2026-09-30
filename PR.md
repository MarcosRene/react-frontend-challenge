# Pull Request: Implementação do Libris - Descoberta e Gerenciamento de Livros

## 🎯 Resumo
Este PR implementa a plataforma **Libris**, uma aplicação de descoberta literária que consome a API do Google Books. O projeto foi construído utilizando a arquitetura **Feature-Sliced Design (FSD)** para garantir escalabilidade e manutenibilidade, focando em uma experiência de usuário fluida e responsiva.

## 🚀 Funcionalidades Implementadas
- **Descoberta de Livros**: Busca em tempo real com Infinite Scroll e filtros avançados (ordenação e tipo de impressão).
- **Gerenciamento de Estante**: Funcionalidade de adicionar/remover livros com persistência local (Zustand + LocalStorage).
- **Detalhes Ricos**: Página detalhada com sinopse, metadados (editora, páginas, data) e link para leitura de amostra.
- **Feedback Visual**: Implementação de Toasts (`sonner`) para todas as ações do usuário e Skeletons para estados de carregamento.
- **Segurança de Dados**: Migração de chaves sensíveis para variáveis de ambiente e limpeza completa do histórico de commits.

## 🏗️ Decisões Técnicas
- **Arquitetura FSD**: Organização do código em camadas (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) para separar responsabilidades.
- **Roteamento Type-safe**: Uso do `TanStack Router` para garantir que as rotas e parâmetros (como IDs de livros) sejam validados em tempo de compilação.
- **Performance**: Implementação de `useDebounce` nas buscas para otimizar chamadas à API e `TanStack Query` para cache de dados.
- **UI/UX**: Design responsivo com Tailwind CSS v4, adaptando a grade de cards de dispositivos móveis até telas ultra-wide.

## 🛠️ Como Testar
1. Clone o repositório.
2. Crie um arquivo `.env.local` seguindo o `ARCHITECTURE.md` e adicione sua `VITE_GOOGLE_API_KEY`.
3. Execute `npm install` e `npm run dev`.
4. Explore a busca na página de "Descoberta" e teste as ações de adicionar à estante.

---

### 📝 Notas Adicionais
O motivo da escolha deste projeto foi o desafio de lidar com metadados complexos e a necessidade de uma organização de estado robusta para a "estante", fugindo dos exemplos tradicionais de mercado. Além disso, foi dada atenção especial à responsividade dos componentes de UI customizados.
