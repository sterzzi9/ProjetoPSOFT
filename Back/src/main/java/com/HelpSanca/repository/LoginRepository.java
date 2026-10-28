package com.helpsanca.HelpSanca.repository;

import com.helpsanca.HelpSanca.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
