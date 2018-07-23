package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Mantenimiento;
import com.mantenimiento.equipomedico.app.repository.MantenimientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrdenTrabajoServiceImpl implements MantenimientoService {

    @Autowired
    private MantenimientoRepository mantenimientoRepository;

    /**
     * Creación de un nuevo mantenimiento.
     *
     * @param mantenimiento
     * @return
     */
    @Override
    public Mantenimiento create(Mantenimiento mantenimiento) {
        return mantenimientoRepository.save(mantenimiento);
    }

    /**
     * Edición de un mantenimiento existente.
     *
     * @param mantenimiento
     * @return
     */
    @Override
    public Mantenimiento update(Mantenimiento mantenimiento) {
        return mantenimientoRepository.save(mantenimiento);
    }

    /**
     * Obtiene el mantenimiento mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Mantenimiento get(Long id) {
        return mantenimientoRepository.findOne(id);
    }

    /**
     * Obtiene todos los mantenimientos.
     *
     * @return
     */
    @Override
    public List<Mantenimiento> getAll() {
        return (ArrayList<Mantenimiento>) mantenimientoRepository.findAll();
    }
}
