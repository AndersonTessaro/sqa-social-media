import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "./page";
import { AuthProvider } from "../../contexts/AuthContext";
import { authService } from "../../service/auth/auth";

// Mock do roteador do Next (deve usar prefixo "mock" para o hoist do jest)
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock do servico de autenticacao (nao chama a API real)
jest.mock("../../service/auth/auth", () => ({
  authService: { signIn: jest.fn() },
}));

/**
 * Teste de INTEGRACAO (tela/fluxo): tela de login.
 * Integra Input + Button + AuthContext + servico.
 * Fluxo de login bem-sucedido -> deve PASSAR (regressao).
 */
describe("Tela de SignIn (fluxo de login)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ao logar com sucesso, redireciona para a pagina principal '/'", async () => {
    (authService.signIn as jest.Mock).mockResolvedValue({
      id: 1,
      email: "usuario@email.com",
    });

    render(
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "usuario@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Senha@123" },
    });

    // Submete o formulario (evita ambiguidade entre os botoes "Entrar")
    const form = screen
      .getByPlaceholderText("seu@email.com")
      .closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith({
        email: "usuario@email.com",
        password: "Senha@123",
      });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
