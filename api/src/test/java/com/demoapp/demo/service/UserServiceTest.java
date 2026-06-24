package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.demoapp.demo.repository.UserRepository;

/**
 * Testes de UNIDADE da regra de negocio de validacao do {@link UserService}.
 *
 * Estes dois testes validam REQUISITOS que ja estao corretos na API
 * (testes de regressao - devem PASSAR).
 */
class UserServiceTest {

  // Repositorio mockado: as validacoes nao tocam o banco de dados.
  private final UserRepository userRepository = mock(UserRepository.class);
  private final UserService userService = new UserService(userRepository);

  @Test
  @DisplayName("Requisito senha forte: aceita senha que atende a todos os criterios")
  void isPasswordValid_comSenhaForte_retornaTrue() {
    // "Senha@123" -> 9 chars, 1 maiuscula, 1 minuscula, 1 numero e 1 especial
    assertTrue(userService.isPasswordValid("Senha@123"));
  }

  @Test
  @DisplayName("Requisito senha forte: rejeita senha que nao atende aos criterios")
  void isPasswordValid_comSenhaFraca_retornaFalse() {
    // "senha" -> sem maiuscula, sem numero, sem especial e com menos de 8 chars
    assertFalse(userService.isPasswordValid("senha"));
  }
}
