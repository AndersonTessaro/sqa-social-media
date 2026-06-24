import { defineConfig, devices } from "@playwright/test";

/**
 * Configuracao do Playwright para a Atividade 5 (E2E + API caixa-preta).
 *
 * Pre-requisito: a aplicacao precisa estar em execucao:
 *  - client (Next.js) em http://localhost:3000
 *  - api (Spring Boot) em http://localhost:8080
 *
 * baseURL aponta para o client (usado nos testes E2E com `page.goto`).
 * Os testes de API usam a URL da API definida em cada spec.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
