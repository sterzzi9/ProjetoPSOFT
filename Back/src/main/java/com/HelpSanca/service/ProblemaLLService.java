package com.helpsanca.HelpSanca.service;

import com.helpsanca.HelpSanca.entity.ProblemaLL;
import com.helpsanca.HelpSanca.entity.Usuario;
import com.helpsanca.HelpSanca.repository.ProblemaLLRepository;
import com.helpsanca.HelpSanca.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemaLLService {

    @Autowired
    private ProblemaLLRepository problemaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<ProblemaLL> listarTodos() {
        return problemaRepository.findAll();
    }

    public List<ProblemaLL> listarPorUsuario(Long usuarioId) {
        return problemaRepository.findByUsuarioId(usuarioId);
    }

    public ProblemaLL salvar(Long usuarioId, ProblemaLL problema) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com id: " + usuarioId));

        problema.setUsuario(usuario);
        return problemaRepository.save(problema);
    }

    public void deletar(Long id) {
        problemaRepository.deleteById(id);
    }
}