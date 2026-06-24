import { render, screen, waitFor } from "@testing-library/react";
import Home from "./page";
import { AuthProvider } from "../contexts/AuthContext";
import { postsService } from "../service/posts/posts";

// Mock do roteador do Next
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock do servico de posts (nao chama a API real)
jest.mock("../service/posts/posts", () => ({
  postsService: { getPosts: jest.fn(), toggleLikePost: jest.fn() },
}));

/**
 * Teste de INTEGRACAO (tela/fluxo): feed da home.
 * Integra Home + Header + varios PostCard consumindo o servico.
 * Renderizacao do feed -> deve PASSAR (regressao).
 */
describe("Tela Home (feed de posts)", () => {
  it("exibe o cabecalho e a lista de posts vinda do servico", async () => {
    (postsService.getPosts as jest.Mock).mockResolvedValue({
      posts: [
        { id: 1, title: "Primeiro post", body: "Corpo 1", liked: false },
        { id: 2, title: "Segundo post", body: "Corpo 2", liked: false },
      ],
      total: 2,
      skip: 0,
      limit: 10,
    });

    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    // Titulo do header (vem do componente Header)
    expect(screen.getByText("SQA Social Media")).toBeInTheDocument();

    // Posts renderizados como varios PostCard
    await waitFor(() => {
      expect(screen.getByText("Primeiro post")).toBeInTheDocument();
      expect(screen.getByText("Segundo post")).toBeInTheDocument();
    });
  });
});
