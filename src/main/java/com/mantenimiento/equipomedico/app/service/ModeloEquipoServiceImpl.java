package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.ModeloEquipo;
import com.mantenimiento.equipomedico.app.repository.ModeloEquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModeloEquipoServiceImpl implements ModeloEquipoService {

    @Autowired
    private ModeloEquipoRepository modeloEquipoRepository;

    /**
     * Creación de un nuevo modeloEquipo.
     *
     * @param modeloEquipo
     * @return
     */
    @Override
    public ModeloEquipo create(ModeloEquipo modeloEquipo) {
        return modeloEquipoRepository.save(modeloEquipo);
    }

    /**
     * Edición de un modeloEquipo existente.
     *
     * @param modeloEquipo
     * @return
     */
    @Override
    public ModeloEquipo update(ModeloEquipo modeloEquipo) {
        return modeloEquipoRepository.save(modeloEquipo);
    }

    /**
     * Obtiene el modeloEquipo mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public ModeloEquipo get(Long id) {
        return modeloEquipoRepository.findOne(id);
    }

    /**
     * Obtiene todos los modeloEquipos.
     *
     * @return
     */
    @Override
    public List<ModeloEquipo> getAll() {
        return (ArrayList<ModeloEquipo>)modeloEquipoRepository.findAll();
    }
}
