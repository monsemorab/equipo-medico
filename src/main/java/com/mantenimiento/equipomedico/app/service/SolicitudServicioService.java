package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.SolicitudServicio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SolicitudServicioService {

    /**
     * Creación de una nueva solicitud de servicio.
     *
     * @param solicitudServicio
     * @return
     */
    SolicitudServicio create(SolicitudServicio solicitudServicio);

    /**
     * Edición de una solicitud de servicio existente.
     *
     * @param solicitudServicio
     * @return
     */
    SolicitudServicio update(SolicitudServicio solicitudServicio);

    /**
     * Obtiene la solicitud de servicio mediante su id.
     *
     * @param id
     * @return
     */
    SolicitudServicio get(Long id);

    /**
     * Obtiene todas las solicitudes de servicio.
     *
     * @return
     */
    List<SolicitudServicio> getAll();

}
