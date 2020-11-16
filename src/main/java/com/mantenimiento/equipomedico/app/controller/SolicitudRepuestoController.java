package com.mantenimiento.equipomedico.app.controller;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import com.mantenimiento.equipomedico.app.service.SolicitudRepuestoService;
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
@RequestMapping("/api/solicitudrepuestos")
public class SolicitudRepuestoController {

    @Autowired
    private SolicitudRepuestoService solicitudRepuestoService;

    public SolicitudRepuestoController(SolicitudRepuestoService solicitudRepuestoService) {
        this.solicitudRepuestoService = solicitudRepuestoService;
    }

    /**
     * Creación de una nueva solicitud de repuesto.
     *
     * @param solicitudRepuesto
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudRepuesto> create(@RequestBody SolicitudRepuesto solicitudRepuesto) throws URISyntaxException {
        SolicitudRepuesto result = solicitudRepuestoService.create(solicitudRepuesto);
        return ResponseEntity.created(new URI("/api/solicitudrepuestos/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de una solicitud de repuesto existente.
     *
     * @param solicitudRepuesto
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudRepuesto> update(@RequestBody SolicitudRepuesto solicitudRepuesto) throws URISyntaxException {
        SolicitudRepuesto result = solicitudRepuestoService.update(solicitudRepuesto);
        return ResponseEntity.created(new URI("/api/solicitudrepuestos/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de solicitudes de repuesto.
     *
     * @return solicitudes lista de solicitudes de repuesto.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SolicitudRepuesto> getAll() {
        return solicitudRepuestoService.getAll();
    }

    /**
     * Obtiene determinada solicitud de repuesto.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SolicitudRepuesto> get(@PathVariable Long id) {
        SolicitudRepuesto solicitudRepuesto = solicitudRepuestoService.get(id);
        return Optional.ofNullable(solicitudRepuesto)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    /**
     * Obtiene la lista de solicitudes de repuesto pendientes.
     *
     * @return solicitudes lista de solicitudes de repuesto.
     */
    @RequestMapping(value = "/pendientes",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<SolicitudRepuesto> getAllRepuestosPendientes() {
        return solicitudRepuestoService.getAllSolicitudRepuestosPendientes();
    }

}
