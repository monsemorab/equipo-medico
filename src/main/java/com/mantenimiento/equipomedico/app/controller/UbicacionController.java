package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.Ubicacion;
import com.mantenimiento.equipomedico.app.service.UbicacionService;
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
@RequestMapping("/api/ubicaciones")
public class UbicacionController {

    @Autowired
    private UbicacionService ubicacionService;

    public UbicacionController(UbicacionService ubicacionService) {
        this.ubicacionService = ubicacionService;
    }

    /**
     * Creación de una nueva ubicación.
     *
     * @param ubicacion
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ubicacion> create(@RequestBody Ubicacion ubicacion) throws URISyntaxException {
        Ubicacion result = ubicacionService.create(ubicacion);
        return ResponseEntity.created(new URI("/api/ubicaciones/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de una ubicación existente.
     *
     * @param ubicacion
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ubicacion> update(@RequestBody Ubicacion ubicacion) throws URISyntaxException {
        Ubicacion result = ubicacionService.update(ubicacion);
        return ResponseEntity.created(new URI("/api/ubicaciones/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de ubicaciones.
     *
     * @return ubicaciones lista de ubicaciones.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ubicacion> getAll() {
        return ubicacionService.getAll();
    }

    /**
     * Obtiene determinado ubicación.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Ubicacion> get(@PathVariable Long id) {
        Ubicacion ubicacion = ubicacionService.get(id);
        return Optional.ofNullable(ubicacion)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
