package com.mantenimiento.equipomedico.app.service;

import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import org.springframework.stereotype.Service;

@Service
public interface SolicitudRepuestoDetalleService
{

    /**
     * Creación de una nueva solicitud de repuesto detalle.
     *
     * @param solicitudRepuestoDetalles
     * @return
     */
    SolicitudRepuestoDetalles create(SolicitudRepuestoDetalles solicitudRepuestoDetalles);

    /**
     * Edición de una solicitud de repuesto detalle existente.
     *
     * @param solicitudRepuestoDetalles
     * @return
     */
    SolicitudRepuestoDetalles update(SolicitudRepuestoDetalles solicitudRepuestoDetalles);

    /**
     * Obtiene la solicitud de repuesto detalle mediante su id.
     *
     * @param id
     * @return
     */
    SolicitudRepuestoDetalles get(Long id);

    /**
     * Obtiene todas las solicitudes de repuesto detalle.
     *
     * @return
     */
    List<SolicitudRepuestoDetalles> getAll();

    /**
     * Obtiene las solicitudes de repuesto detalle mediante su solicitud id.
     *
     * @param solicitudId
     * @return
     */
    List<SolicitudRepuestoDetalles> getBySolicitudId(Long solicitudId);

    List<SolicitudRepuestoDetalles> getAllByEquipoIdAndFecha(Long id, Date fechaInicio, Date fechaFin);

    List<SolicitudRepuestoDetalles> getAllByEquipoId(Long id);

}
