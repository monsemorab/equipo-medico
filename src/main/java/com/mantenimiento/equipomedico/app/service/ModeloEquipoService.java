package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Modelo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ModeloEquipoService {

    /**
     * Creación de un nuevo modelo de equipo.
     *
     * @param modelo
     * @return
     */
    Modelo create(Modelo modelo);

    /**
     * Edición de un modelo de equipo existente.
     *
     * @param modelo
     * @return
     */
    Modelo update(Modelo modelo);

    /**
     * Obtiene el modelo de equipo mediante su id.
     *
     * @param id
     * @return
     */
    Modelo get(Long id);

    /**
     * Obtiene todos los modelos de equipos.
     *
     * @return
     */
    List<Modelo> getAll();

    /**
     * Obtiene todos los modelos de determinada marca
     * @param marcaId
     * @return
     */
    List<Modelo> getAllModelosByMarca(Long marcaId);
}
