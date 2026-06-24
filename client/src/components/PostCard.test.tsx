import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "@/components/PostCard";
import { Post } from "@/service/types";

const post: Post = {
  id: 1,
  title: "Titulo do post",
  body: "Corpo do post",
  liked: false,
};

/**
 * Teste UNITARIO de COMPONENTE (isolado).
 * Valida o requisito do feed para usuario DESLOGADO -> deve PASSAR (regressao).
 */
describe("<PostCard />", () => {
  beforeEach(() => {
    // jsdom nao implementa window.alert; mockamos para inspecionar a chamada.
    window.alert = jest.fn();
  });

  it("renderiza titulo, corpo e o botao 'Curtir'", () => {
    render(
      <PostCard post={post} isAuthenticated={false} onLike={jest.fn()} />
    );

    expect(screen.getByText("Titulo do post")).toBeInTheDocument();
    expect(screen.getByText("Corpo do post")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Curtir/i })
    ).toBeInTheDocument();
  });

  it("usuario deslogado: ao curtir exibe alert e NAO chama onLike", () => {
    const onLike = jest.fn();
    render(<PostCard post={post} isAuthenticated={false} onLike={onLike} />);

    fireEvent.click(screen.getByRole("button", { name: /Curtir/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Você precisa estar autenticado para curtir posts!"
    );
    expect(onLike).not.toHaveBeenCalled();
  });
});
