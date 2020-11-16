package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SolicitudRepuestoService {

    /**
     * Creación de una nueva solicitud de repuesto.
     *
     * @param solicitudRepuesto
     * @return
     */
    SolicitudRepuesto create(SolicitudRepuesto solicitudRepuesto);

    /**
     * Edición de una solicitud de repuesto existente.
     *
     * @param solicitudRepuesto
     * @return
     */
    SolicitudRepuesto update(SolicitudRepuesto solicitudRepuesto);

    /**
     * Obtiene la solicitud de repuesto mediante su id.
     *
     * @param id
     * @return
     */
    SolicitudRepuesto get(Long id);

    /**
     * Obtiene todas las solicitudes de repuesto.
     *
     * @return
     */
    List<SolicitudRepuesto> getAll();


    List<SolicitudRepuesto> getAllRepuestosByEstado(String estado);
}
