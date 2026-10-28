package com.helpsanca.HelpSanca.service;


import com.helpsanca.HelpSanca.entity.Usuario;
import com.helpsanca.HelpSanca.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    @Transactional
    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void deletar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado com o id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public Usuario atualizar(Long id, Usuario usuarioAtualizar) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNome(usuarioAtualizar.getNome());
                    usuario.setEmail(usuarioAtualizar.getEmail());
                    usuario.setSenha(usuarioAtualizar.getSenha());
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado com o id: " + id));
    }
}