package com.helpsanca.HelpSanca.service;

import com.helpsanca.HelpSanca.entity.Usuario;
import com.helpsanca.HelpSanca.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private LoginRepository repository;

    public Usuario buscarPorEmail(String email){
        return repository.findByEmail(email);
    }

}
