package com.demoapp.demo.controller;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.demoapp.demo.model.User;
import com.demoapp.demo.repository.UserRepository;
import com.demoapp.demo.service.UserService;

/**
 * Teste de INTEGRACAO (controller + service) do {@link AuthController} via MockMvc.
 *
 * Captura um BUG: o requisito diz que, ao cadastrar um e-mail ja existente,
 * a API deve responder com a mensagem "E-mail ja cadastrado".
 * A API atual responde "E-mail ja esta em uso" -> este teste DEVE FALHAR.
 */
class AuthControllerTest {

  // Apenas o repositorio (interface) e mockado; o UserService e real.
  private final UserRepository userRepository = mock(UserRepository.class);
  private final UserService userService = new UserService(userRepository);
  private final MockMvc mockMvc =
      MockMvcBuilders.standaloneSetup(new AuthController(userService)).build();

  @Test
  @DisplayName("BUG: signup com e-mail ja cadastrado deve retornar 'E-mail ja cadastrado'")
  void signup_comEmailJaCadastrado_retornaMensagemDoRequisito() throws Exception {
    // O e-mail informado JA existe na base de dados.
    when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(new User()));

    String body = "{\"email\":\"existente@email.com\",\"password\":\"Senha@123\"}";

    mockMvc.perform(post("/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
        .andExpect(status().isConflict())
        // Requisito do trabalho. A API devolve "E-mail ja esta em uso" -> falha aqui.
        .andExpect(jsonPath("$.message").value("E-mail já cadastrado"));
  }
}
