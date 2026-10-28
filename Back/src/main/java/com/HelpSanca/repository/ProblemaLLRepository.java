package com.helpsanca.HelpSanca.repository;

import com.helpsanca.HelpSanca.entity.ProblemaLL;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemaLLRepository extends JpaRepository<ProblemaLL, Long> {

    List<ProblemaLL> findByUsuarioId(Long usuarioId);
}