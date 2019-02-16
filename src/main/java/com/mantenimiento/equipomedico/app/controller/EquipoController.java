package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.service.EquipoService;
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
@RequestMapping("/api/equipos")
public class EquipoController {

    @Autowired
    private EquipoService equipoService;

    public EquipoController(EquipoService equipoService) {
        this.equipoService = equipoService;
    }

    /**
     * Creación de un nuevo equipo.
     *
     * @param equipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Equipo> create(@RequestBody Equipo equipo) throws URISyntaxException {
        Equipo result = equipoService.create(equipo);
        return ResponseEntity.created(new URI("/api/equipos/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de un equipo existente.
     *
     * @param equipo
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Equipo> update(@RequestBody Equipo equipo) throws URISyntaxException {
        Equipo result = equipoService.create(equipo);
        return ResponseEntity.created(new URI("/api/equipos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de equipos.
     *
     * @return equipos lista de equipos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Equipo> getAll() {
        return equipoService.getAll();
    }

    /**
     * Obtiene la lista de equipos sin contrato.
     *
     * @return equipos lista de equipos sin contrato
     */
    @RequestMapping(value = "/sincontrato",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Equipo> getSinContrato() {
        return equipoService.getSinContrato();
    }

    /**
     * Obtiene determinado equipo.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Equipo> get(@PathVariable Long id) {
        Equipo equipo = equipoService.get(id);
        return Optional.ofNullable(equipo)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
