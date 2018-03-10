package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EquipoService {

    /**
     * Creación de un nuevo equipo.
     *
     * @param equipo
     * @return
     */
    Equipo create(Equipo equipo);

    /**
     * Edición de un equipo existente.
     *
     * @param equipo
     * @return
     */
    Equipo update(Equipo equipo);

    /**
     * Obtiene el equipo mediante su id.
     *
     * @param id
     * @return
     */
    Equipo get(Long id);

    /**
     * Obtiene todos los equipos.
     *
     * @return
     */
    List<Equipo> getAll();

}
