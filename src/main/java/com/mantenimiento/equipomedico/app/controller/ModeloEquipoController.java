package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.ModeloEquipo;
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
    public ResponseEntity<ModeloEquipo> create(@RequestBody ModeloEquipo modeloEquipo) throws URISyntaxException {
        ModeloEquipo result = modeloEquipoService.create(modeloEquipo);
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
    public ResponseEntity<ModeloEquipo> update(@RequestBody ModeloEquipo modeloEquipo) throws URISyntaxException {
        ModeloEquipo result = modeloEquipoService.update(modeloEquipo);
        return ResponseEntity.created(new URI("/api/modelos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de modeloEquipos.
     *
     * @return modeloEquipos lista de modeloEquipos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ModeloEquipo> getAll() {
        return modeloEquipoService.getAll ();
    }

    /**
     * Obtiene determinado modeloEquipo.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ModeloEquipo> get(@PathVariable Long id) {
        ModeloEquipo modeloEquipo = modeloEquipoService.get(id);
        return Optional.ofNullable(modeloEquipo)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
