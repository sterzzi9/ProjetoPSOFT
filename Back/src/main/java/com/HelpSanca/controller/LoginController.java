package com.helpsanca.HelpSanca.controller;

import com.helpsanca.HelpSanca.dto.UsuarioDTO;
import com.helpsanca.HelpSanca.entity.Usuario;
import com.helpsanca.HelpSanca.service.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private LoginService service;


    @PostMapping("/logout")
    public ResponseEntity<?> logout( HttpSession session) {
        session.invalidate();
        return ResponseEntity.status(200).body("Tchau, até a proxima");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO login, HttpSession session) {
        Usuario usuario = service.buscarPorEmail(login.getEmail());

        if (usuario == null || !usuario.getSenha().equals(login.getSenha())) {
            return ResponseEntity.status(401).body("E-mail ou senha incorretos.");
        }

        session.setAttribute("usuarioLogado", usuario);
        
        return ResponseEntity.ok(usuario);
    }
    @GetMapping("/MinhasInfo")
    public ResponseEntity<?> MinhasInfo(HttpSession session) {
        Usuario usuarioLogado = (Usuario) session.getAttribute("usuarioLogado");

        if (usuarioLogado == null) {
            return ResponseEntity.status(401).body("Usuário não está autenticado.");
        }

        String resposta = "Minhas Informações | Nome: " + usuarioLogado.getNome() +
                " | Email: " + usuarioLogado.getEmail() +
                " | Senha: " + usuarioLogado.getSenha();

        return ResponseEntity.status(200).body(resposta);
    }


}