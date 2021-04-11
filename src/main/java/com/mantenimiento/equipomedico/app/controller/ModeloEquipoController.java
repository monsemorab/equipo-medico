package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Modelo;
import com.mantenimiento.equipomedico.app.service.ModeloEquipoService;
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
@RequestMapping("/api/modelos")
public class ModeloEquipoController {

    @Autowired
    private ModeloEquipoService modeloEquipoService;

    public ModeloEquipoController(ModeloEquipoService modeloEquipoService) {
        this.modeloEquipoService = modeloEquipoService;
    }

    /**
     * Creación de un nuevo modelo de equipo.
     *
     * @param modeloEquipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Modelo> create(@RequestBody Modelo modeloEquipo) throws URISyntaxException {
        Modelo result = modeloEquipoService.create(modeloEquipo);
        return ResponseEntity.created(new URI("/api/modelos/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de un modelo de equipo existente.
     *
     * @param modeloEquipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Modelo> update(@RequestBody Modelo modeloEquipo) throws URISyntaxException {
        Modelo result = modeloEquipoService.update(modeloEquipo);
        return ResponseEntity.created(new URI("/api/modelos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de modeloEquipos.
     *
     * @return modeloEquipos lista de modeloEquipos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Modelo> getAll() {
        return modeloEquipoService.getAll ();
    }

    /**
     * Obtiene determinado modeloEquipo.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Modelo> get(@PathVariable Long id) {
        Modelo modeloEquipo = modeloEquipoService.get(id);
        return Optional.ofNullable(modeloEquipo)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Obtiene la lista de modeloEquipos by marca
     *
     * @return modeloEquipos lista de modeloEquipos.
     */
    @RequestMapping(value = "/by-marca/{marcaId}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Modelo> getAll(@PathVariable Long marcaId) {
        return modeloEquipoService.getAllModelosByMarca(marcaId);
    }

}
