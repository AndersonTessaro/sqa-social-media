# Testes E2E e de API — SQA Social Media (Atividade 5)

Projeto de testes de caixa-preta criado do zero com [Playwright](https://playwright.dev/).
Testa o sistema **em execução**: E2E no navegador (client) e os endpoints públicos da API.

## Estrutura

```
tests/
├── playwright.config.ts      # configuração (baseURL do client)
├── package.json
└── tests/
    ├── api/auth.api.spec.ts   # 4 testes de API (caixa-preta)
    └── e2e/flows.e2e.spec.ts  # 2 testes End-to-End
```

## Pré-requisitos

A aplicação precisa estar **rodando** antes de executar os testes:

- API (Spring Boot): `cd ../api && ./mvnw spring-boot:run` → `http://localhost:8080`
- Client (Next.js): `cd ../client && npm run dev` → `http://localhost:3000`

## Instalação

```bash
cd tests
npm install
npx playwright install chromium   # baixa o navegador usado nos testes E2E
```

## Como rodar

```bash
npm test          # todos os testes (API + E2E)
npm run test:api  # somente testes de API
npm run test:e2e  # somente testes E2E
npm run report    # abre o último relatório HTML
```

## Testes implementados

### API (4 — caixa-preta)
1. `GET /posts` → 200 com lista de posts.
2. `POST /auth/signin` credenciais inválidas → 401 "Credenciais inválidas".
3. `POST /auth/signup` senha fraca → 422 "Senha inválida".
4. `POST /auth/reset-password` e-mail não cadastrado → 404 "Usuário não encontrado".

### E2E (2 — fluxos completos)
1. Cadastro: novo usuário se cadastra e é redirecionado para a home autenticado.
2. Curtir deslogado: clicar em "Curtir" sem login exibe o alert nativo pedindo autenticação.
