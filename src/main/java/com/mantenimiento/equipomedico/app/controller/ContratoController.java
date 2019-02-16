package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import com.mantenimiento.equipomedico.app.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    public ContratoController(ContratoService contratoService) {
        this.contratoService = contratoService;
    }

    /**
     * Creación de un nuevo contrato.
     *
     * @param contrato
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Contrato> create(@RequestBody Contrato contrato) throws URISyntaxException {
        Contrato result = contratoService.create(contrato);
        return ResponseEntity.created(new URI("/api/contratos/" + result.getNumeroContrato()))
                .body(result);
    }

    /**
     * Edición de un contrato existente.
     *
     * @param contrato
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Contrato> update(@RequestBody Contrato contrato) throws URISyntaxException {
        Contrato result = contratoService.create(contrato);
        return ResponseEntity.created(new URI("/api/contratos/" + result.getNumeroContrato()))
                .body(result);
    }

    /**
     * Obtiene la lista de contratos.
     *
     * @return contratos lista de contratos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Contrato> getAll() {
        return contratoService.getAll();
    }

    /**
     * Obtiene determinado contrato.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Contrato> get(@PathVariable Long id) {
        Contrato contrato = contratoService.get(id);
        return Optional.ofNullable(contrato)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
