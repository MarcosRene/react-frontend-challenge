# Arquitetura do Projeto

Este projeto foi desenvolvido seguindo os princípios do **Feature-Sliced Design (FSD)**, uma metodologia de arquitetura para projetos de frontend que visa facilitar a escalabilidade, manutenção e o reaproveitamento de código.

## 1. Estrutura de Pastas (FSD)

A arquitetura é dividida em camadas, cada uma com uma responsabilidade bem definida:

- **app/**: Configurações globais da aplicação, provedores (Providers) e definição de rotas.
- **pages/**: Composição das páginas da aplicação. Cada página utiliza componentes das camadas inferiores.
- **widgets/**: Componentes complexos e autônomos que combinam funcionalidades de diversas features ou entidades (ex: Sidebar).
- **features/**: Funcionalidades que entregam valor ao usuário (ex: Busca de livros, Autenticação).
- **entities/**: Modelos de dados e lógica de negócio específica do domínio (ex: Livro, Usuário).
- **shared/**: Recursos reutilizáveis e utilitários que não possuem conhecimento das camadas superiores (ex: Componentes de UI básicos, instâncias de API).

## 2. Gerenciamento de Autenticação

Como o projeto não possui um backend real, a autenticação foi implementada utilizando uma estratégia de persistência local:

- **Zustand**: Utilizado para gerenciar o estado global de autenticação.
- **LocalStorage**: O estado do usuário é persistido no navegador para garantir que o acesso seja mantido mesmo após o recarregamento da página.
- **Fluxo**: Ao realizar o "login", os dados informados são armazenados no storage. As rotas são protegidas por um middleware no `TanStack Router` que verifica a existência dessa sessão ativa antes de permitir o acesso.

## 3. Desafios com a API do Google Books

A integração com a API do Google Books foi direta, porém apresentou uma limitação técnica importante em relação à segurança e disponibilidade:

- **Rate Limit e API Key**: Durante o desenvolvimento, observou-se que requisições realizadas sem uma `API_KEY` válida sofriam bloqueios frequentes por *rate limit*, impedindo a navegação fluida.
- **Solução**: Foi implementada a configuração de variáveis de ambiente para o tráfego seguro da chave, garantindo que as buscas por volumes e detalhes de livros funcionem de forma consistente e sem interrupções para o usuário final.
