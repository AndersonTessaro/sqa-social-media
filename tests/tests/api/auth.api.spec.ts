import { test, expect } from "@playwright/test";

/**
 * Testes de API (caixa-preta) - Atividade 5.
 *
 * Validam o comportamento publico dos endpoints da API Spring Boot
 * (http://localhost:8080) com entradas conhecidas.
 */

const API_URL = "http://localhost:8080";

test.describe("API - endpoints publicos", () => {
  test("GET /posts retorna 200 com a lista de posts do feed", async ({ request }) => {
    const res = await request.get(`${API_URL}/posts?limit=5`);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.posts)).toBe(true);
    expect(body.posts.length).toBeGreaterThan(0);
  });

  test("POST /auth/signin com credenciais invalidas retorna 401", async ({ request }) => {
    const res = await request.post(`${API_URL}/auth/signin`, {
      data: { email: "naoexiste@email.com", password: "Senha@123" },
    });

    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.message).toBe("Credenciais inválidas");
  });

  test("POST /auth/signup com senha fraca retorna 422", async ({ request }) => {
    const res = await request.post(`${API_URL}/auth/signup`, {
      data: { email: "qualquer@email.com", password: "123" },
    });

    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.message).toBe("Senha inválida");
  });

  test("POST /auth/reset-password com e-mail nao cadastrado retorna 404", async ({ request }) => {
    const res = await request.post(`${API_URL}/auth/reset-password`, {
      data: { email: "naoexiste@email.com" },
    });

    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.message).toBe("Usuário não encontrado");
  });
});
