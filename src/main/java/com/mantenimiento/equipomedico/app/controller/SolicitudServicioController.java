package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.SolicitudServicio;
import com.mantenimiento.equipomedico.app.service.SolicitudServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/solicitudservicios")
public class SolicitudServicioController {

    @Autowired
    private SolicitudServicioService solicitudServicioService;

    public SolicitudServicioController(SolicitudServicioService solicitudServicioService) {
        this.solicitudServicioService = solicitudServicioService;
    }

    /**
     * Creación de una nueva solicitud de servicio.
     *
     * @param solicitudServicio
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudServicio> create(@RequestBody SolicitudServicio solicitudServicio) throws URISyntaxException {
        SolicitudServicio result = solicitudServicioService.create(solicitudServicio);
        return ResponseEntity.created(new URI("/api/solicitudservicios/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de una solicitud de servicio existente.
     *
     * @param solicitudServicio
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudServicio> update(@RequestBody SolicitudServicio solicitudServicio) throws URISyntaxException {
        SolicitudServicio result = solicitudServicioService.update(solicitudServicio);
        return ResponseEntity.created(new URI("/api/solicitudservicios/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de solicitudes de servicio.
     *
     * @return solicitudes lista de solicitudes de servicio.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SolicitudServicio> getAll() {
        return solicitudServicioService.getAll();
    }

    /**
     * Obtiene determinada solicitud de servicio.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudServicio> get(@PathVariable Long id) {
        SolicitudServicio solicitudServicio = solicitudServicioService.get(id);
        return Optional.ofNullable(solicitudServicio)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
