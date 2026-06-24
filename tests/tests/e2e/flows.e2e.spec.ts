import { test, expect } from "@playwright/test";

/**
 * Testes End-to-End (E2E) - Atividade 5.
 *
 * Simulam um usuario real no navegador, cobrindo fluxos completos.
 * Pre-requisito: client (http://localhost:3000) e api (http://localhost:8080)
 * precisam estar em execucao.
 */

test.describe("Fluxos E2E", () => {
  test("cadastro: novo usuario se cadastra e e direcionado para a home autenticado", async ({
    page,
  }) => {
    // E-mail unico a cada execucao para nao colidir com a base de dados
    const email = `user_${Date.now()}@email.com`;
    const senha = "Senha@1234"; // 10 chars: forte e acima do minimo

    await page.goto("/signup");

    await page.getByPlaceholder("seu@email.com").fill(email);
    await page.getByPlaceholder("••••••••").first().fill(senha); // Senha
    await page.getByPlaceholder("••••••••").nth(1).fill(senha); // Confirmar Senha

    // Botao de submit do formulario (type="submit")
    await page.locator('button[type="submit"]').click();

    // Apos cadastro, deve redirecionar para a home e estar autenticado
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
  });

  test("curtir deslogado: exibe alert nativo pedindo autenticacao", async ({
    page,
  }) => {
    await page.goto("/");

    // Captura o alert nativo do navegador disparado ao curtir sem login
    let dialogMessage = "";
    page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Curtir" }).first().click();

    await expect
      .poll(() => dialogMessage)
      .toBe("Você precisa estar autenticado para curtir posts!");
  });
});
