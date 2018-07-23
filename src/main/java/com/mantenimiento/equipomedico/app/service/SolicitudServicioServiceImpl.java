package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudServicio;
import com.mantenimiento.equipomedico.app.repository.SolicitudRepuestoRepository;
import com.mantenimiento.equipomedico.app.repository.SolicitudServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SolicitudServicioServiceImpl implements SolicitudServicioService {

    @Autowired
    private SolicitudServicioRepository solicitudServicioRepository;

    /**
     * Creación de una nueva solicitud de servicio.
     *
     * @param solicitudServicio
     * @return
     */
    @Override
    public SolicitudServicio create(SolicitudServicio solicitudServicio) {
        return solicitudServicioRepository.save(solicitudServicio);
    }

    /**
     * Edición de una solicitud de servicio existente.
     *
     * @param solicitudServicio
     * @return
     */
    @Override
    public SolicitudServicio update(SolicitudServicio solicitudServicio) {
        return solicitudServicioRepository.save(solicitudServicio);
    }

    /**
     * Obtiene la solicitud de servicio mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public SolicitudServicio get(Long id) {
        return solicitudServicioRepository.findOne(id);
    }

    /**
     * Obtiene todas las solicitudes de servicios.
     *
     * @return
     */
    @Override
    public List<SolicitudServicio> getAll() {
        return (ArrayList<SolicitudServicio>)solicitudServicioRepository.findAll();
    }
}
