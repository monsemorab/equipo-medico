package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.repository.RepuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RepuestoServiceImpl implements RepuestoService {

    @Autowired
    private RepuestoRepository repuestoRepository;

    /**
     * Creación de un nuevo repuesto.
     *
     * @param repuesto
     * @return
     */
    @Override
    public Repuesto create(Repuesto repuesto) {
        return repuestoRepository.save(repuesto);
    }

    /**
     * Edición de un repuesto existente.
     *
     * @param repuesto
     * @return
     */
    @Override
    public Repuesto update(Repuesto repuesto) {
        return repuestoRepository.save(repuesto);
    }

    /**
     * Obtiene el repuesto mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Repuesto get(Long id) {
        return repuestoRepository.findOne(id);
    }

    /**
     * Obtiene todos los repuestos.
     *
     * @return
     */
    @Override
    public List<Repuesto> getAll() {
        return (ArrayList<Repuesto>)repuestoRepository.findAll();
    }
}
