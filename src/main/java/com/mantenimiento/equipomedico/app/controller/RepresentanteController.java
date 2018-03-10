package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Representante;
import com.mantenimiento.equipomedico.app.service.RepresentanteService;
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
@RequestMapping("/api/representantes")
public class RepresentanteController {

    @Autowired
    private RepresentanteService representanteService;

    public RepresentanteController(RepresentanteService representanteService) {
        this.representanteService = representanteService;
    }

    /**
     * Creación de un nuevo representante.
     *
     * @param representante
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Representante> create(@RequestBody Representante representante) throws URISyntaxException {
        Representante result = representanteService.create(representante);
        return ResponseEntity.created(new URI("/api/representantes/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de un representante existente.
     *
     * @param representante
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Representante> update(@RequestBody Representante representante) throws URISyntaxException {
        Representante result = representanteService.update(representante);
        return ResponseEntity.created(new URI("/api/representantes/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de representates.
     *
     * @return representates lista de representates.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Representante> getAll() {
        return representanteService.getAll();
    }

    /**
     * Obtiene determinado representante.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Representante> get(@PathVariable Long id) {
        Representante representante = representanteService.get(id);
        return Optional.ofNullable(representante)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
