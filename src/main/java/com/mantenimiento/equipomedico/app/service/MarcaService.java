package com.mantenimiento.equipomedico.app.service;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Marca;
import org.springframework.stereotype.Service;

@Service
public interface MarcaService
{

    /**
     * Creación de un nueva marca de equipo.
     *
     * @param marca
     * @return
     */
    Marca create(Marca marca);

    /**
     * Edición de una marca de equipo existente.
     *
     * @param marca
     * @return
     */
    Marca update(Marca marca);

    /**
     * Obtiene el marca de equipo mediante su id.
     *
     * @param id
     * @return
     */
    Marca get(Long id);

    /**
     * Obtiene todos las marcas de equipos.
     *
     * @return
     */
    List<Marca> getAll();

}
