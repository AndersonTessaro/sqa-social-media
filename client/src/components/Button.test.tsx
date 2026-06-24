import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

/**
 * Teste UNITARIO de COMPONENTE (isolado).
 * Valida comportamentos corretos do Button -> deve PASSAR (regressao).
 */
describe("<Button />", () => {
  it("renderiza o texto (children) e dispara onClick ao clicar", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Entrar</Button>);

    const button = screen.getByRole("button", { name: "Entrar" });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("exibe 'Carregando...' e fica desabilitado quando isLoading e true", () => {
    const handleClick = jest.fn();
    render(
      <Button isLoading onClick={handleClick}>
        Entrar
      </Button>
    );

    const button = screen.getByRole("button", { name: "Carregando..." });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
