package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.service.RepuestoService;
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
@RequestMapping("/api/repuestos")
public class RepuestoController {

    @Autowired
    private RepuestoService repuestoService;

    public RepuestoController(RepuestoService repuestoService) {
        this.repuestoService = repuestoService;
    }

    /**
     * Creación de un nuevo repuesto.
     *
     * @param repuesto
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Repuesto> create(@RequestBody Repuesto repuesto) throws URISyntaxException {
        Repuesto result = repuestoService.create(repuesto);
        return ResponseEntity.created(new URI("/api/repuestos/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de un repuesto existente.
     *
     * @param repuesto
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Repuesto> update(@RequestBody Repuesto repuesto) throws URISyntaxException {
        Repuesto result = repuestoService.update(repuesto);
        return ResponseEntity.created(new URI("/api/repuestos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de repuestos.
     *
     * @return equipos lista de repuestos.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Repuesto> getAll() {
        return repuestoService.getAll ();
    }

    /**
     * Obtiene determinado repuesto.
     *
     * @param id
     * @return
     */
//    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<Repuesto> get(@PathVariable Long id) {
//        Repuesto repuesto = repuestoService.get(id);
//        return Optional.ofNullable(repuesto)
//                .map(result -> new ResponseEntity<>(
//                        result,
//                        HttpStatus.OK))
//                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }

    /**
     * Obtiene determinado repuesto por el código
     *
     * @param codigo
     * @return
     */
    @RequestMapping(value = "byCodigo/{codigo}",
        method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Repuesto> getByCodigo(@PathVariable String codigo) {

        Repuesto repuesto = repuestoService.getByCodigo(codigo);
        return Optional.ofNullable(repuesto)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
