package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.TipoEquipo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TipoEquipoService {

    /**
     * Creación de un nuevo tipo de equipo.
     *
     * @param tipoEquipo
     * @return
     */
    TipoEquipo create(TipoEquipo tipoEquipo);

    /**
     * Edición de un tipo de equipo existente.
     *
     * @param tipoEquipo
     * @return
     */
    TipoEquipo update(TipoEquipo tipoEquipo);

    /**
     * Obtiene el tipo de equipo mediante su id.
     *
     * @param id
     * @return
     */
    TipoEquipo get(Long id);

    /**
     * Obtiene todos los tipos de equipos.
     *
     * @return
     */
    List<TipoEquipo> getAll();

}
