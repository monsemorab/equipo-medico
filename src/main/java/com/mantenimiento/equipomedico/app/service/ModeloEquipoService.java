package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.ModeloEquipo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ModeloEquipoService {

    /**
     * Creación de un nuevo modelo de equipo.
     *
     * @param modeloEquipo
     * @return
     */
    ModeloEquipo create(ModeloEquipo modeloEquipo);

    /**
     * Edición de un modelo de equipo existente.
     *
     * @param modeloEquipo
     * @return
     */
    ModeloEquipo update(ModeloEquipo modeloEquipo);

    /**
     * Obtiene el modelo de equipo mediante su id.
     *
     * @param id
     * @return
     */
    ModeloEquipo get(Long id);

    /**
     * Obtiene todos los modelos de equipos.
     *
     * @return
     */
    List<ModeloEquipo> getAll();

}
