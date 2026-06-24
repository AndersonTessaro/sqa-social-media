import { isEmailValid, getEmailValidationMessage } from "@/utils/email";

/**
 * Teste UNITARIO de funcao pura (sem renderizacao de componente).
 * Valida o requisito de e-mail valido -> deve PASSAR (regressao).
 */
describe("utils/email - isEmailValid", () => {
  it("retorna true para um e-mail valido", () => {
    expect(isEmailValid("usuario@email.com")).toBe(true);
  });

  it("retorna false para um e-mail invalido", () => {
    expect(isEmailValid("usuario-sem-arroba")).toBe(false);
  });

  it("retorna mensagem de erro quando o e-mail e invalido", () => {
    expect(getEmailValidationMessage("invalido")).toBe("Email inválido");
  });
});
