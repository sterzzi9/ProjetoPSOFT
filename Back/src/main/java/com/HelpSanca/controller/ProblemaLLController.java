package com.helpsanca.HelpSanca.controller;

import com.helpsanca.HelpSanca.entity.ProblemaLL;
import com.helpsanca.HelpSanca.service.ProblemaLLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/problemasLongitudeLatitude")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class ProblemaLLController {

    @Autowired
    private ProblemaLLService problemaService;

    @GetMapping
    public ResponseEntity<List<ProblemaLL>> listarTodos() {
        return ResponseEntity.ok(problemaService.listarTodos());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ProblemaLL>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(problemaService.listarPorUsuario(usuarioId));
    }


    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<ProblemaLL> criar(@PathVariable Long usuarioId, @RequestBody ProblemaLL problema) {
        ProblemaLL novoProblema = problemaService.salvar(usuarioId, problema);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProblema);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        problemaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}