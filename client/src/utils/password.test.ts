import { isPasswordValid } from "@/utils/password";

/**
 * Teste UNITARIO de funcao pura (sem renderizacao de componente).
 *
 * Captura um BUG: o requisito exige "minimo 8 caracteres", ou seja,
 * uma senha forte com EXATAMENTE 8 caracteres deve ser aceita.
 * A funcao usa `password.length <= 8` (deveria ser `< 8`), entao rejeita
 * senhas de 8 caracteres -> este teste DEVE FALHAR.
 */
describe("utils/password - isPasswordValid", () => {
  it("BUG: aceita senha forte com exatamente 8 caracteres", () => {
    // "Abc123!@" -> 8 chars, 1 maiuscula, 1 minuscula, 1 numero e 1 especial
    expect(isPasswordValid("Abc123!@")).toBe(true);
  });

  it("rejeita senha sem caractere especial", () => {
    // Comportamento correto -> este teste PASSA (regressao)
    expect(isPasswordValid("Abc123456")).toBe(false);
  });
});
