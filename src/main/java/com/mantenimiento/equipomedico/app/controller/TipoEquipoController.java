package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.TipoEquipo;
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
@RequestMapping("/api/tipos")
public class TipoEquipoController {

    @Autowired
    private TipoEquipoService tipoEquipoService;

    public TipoEquipoController(TipoEquipoService tipoEquipoService) {
        this.tipoEquipoService = tipoEquipoService;
    }

    /**
     * Creación de un nuevo tipo de equipo.
     *
     * @param tipoEquipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TipoEquipo> create(@RequestBody TipoEquipo tipoEquipo) throws URISyntaxException {
        TipoEquipo result = tipoEquipoService.create(tipoEquipo);
        return ResponseEntity.created(new URI("/api/tipos/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de un tipo de equipo existente.
     *
     * @param tipoEquipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TipoEquipo> update(@RequestBody TipoEquipo tipoEquipo) throws URISyntaxException {
        TipoEquipo result = tipoEquipoService.update(tipoEquipo);
        return ResponseEntity.created(new URI("/api/tipos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de tipoEquipos.
     *
     * @return tipoEquipos lista de tipoEquipos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TipoEquipo> getAll() {
        return tipoEquipoService.getAll ();
    }

    /**
     * Obtiene determinado tipoEquipos.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TipoEquipo> get(@PathVariable Long id) {
        TipoEquipo tipoEquipo = tipoEquipoService.get(id);
        return Optional.ofNullable(tipoEquipo)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
