package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import com.mantenimiento.equipomedico.app.repository.SolicitudRepuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SolicitudRepuestoServiceImpl implements SolicitudRepuestoService {

    @Autowired
    private SolicitudRepuestoRepository solicitudRepuestoRepository;

    /**
     * Creación de una nueva solicitud de repuesto.
     *
     * @param solicitudRepuesto
     * @return
     */
    @Override
    public SolicitudRepuesto create(SolicitudRepuesto solicitudRepuesto) {
        return solicitudRepuestoRepository.save(solicitudRepuesto);
    }

    /**
     * Edición de una solicitud de repuesto existente.
     *
     * @param solicitudRepuesto
     * @return
     */
    @Override
    public SolicitudRepuesto update(SolicitudRepuesto solicitudRepuesto) {
        return solicitudRepuestoRepository.save(solicitudRepuesto);
    }

    /**
     * Obtiene la solicitud de repuesto mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public SolicitudRepuesto get(Long id) {
        Optional<SolicitudRepuesto> entity = solicitudRepuestoRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todas las solicitudes de repuestos.
     *
     * @return
     */
    @Override
    public List<SolicitudRepuesto> getAll() {
        return (ArrayList<SolicitudRepuesto>)solicitudRepuestoRepository.findAll();
    }
}
