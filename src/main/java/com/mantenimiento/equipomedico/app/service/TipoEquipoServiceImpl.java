package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.TipoEquipo;
import com.mantenimiento.equipomedico.app.repository.TipoEquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TipoEquipoServiceImpl implements TipoEquipoService {

    @Autowired
    private TipoEquipoRepository tipoEquipoRepository;

    /**
     * Creación de un nuevo tipoEquipo.
     *
     * @param tipoEquipo
     * @return
     */
    @Override
    public TipoEquipo create(TipoEquipo tipoEquipo) {
        return tipoEquipoRepository.save(tipoEquipo);
    }

    /**
     * Edición de un tipoEquipo existente.
     *
     * @param tipoEquipo
     * @return
     */
    @Override
    public TipoEquipo update(TipoEquipo tipoEquipo) {
        return tipoEquipoRepository.save(tipoEquipo);
    }

    /**
     * Obtiene el tipoEquipo mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public TipoEquipo get(Long id) {
        return tipoEquipoRepository.findOne(id);
    }

    /**
     * Obtiene todos los tipoEquipos.
     *
     * @return
     */
    @Override
    public List<TipoEquipo> getAll() {
        return (ArrayList<TipoEquipo>)tipoEquipoRepository.findAll();
    }
}
