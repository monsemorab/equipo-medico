package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Representante;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RepresentanteService {

    /**
     * Creación de un nuevo representante.
     *
     * @param representante
     * @return
     */
    Representante create(Representante representante);

    /**
     * Edición de un representante existente.
     *
     * @param representante
     * @return
     */
    Representante update(Representante representante);

    /**
     * Obtiene el equipo mediante su id.
     *
     * @param id
     * @return
     */
    Representante get(Long id);

    /**
     * Obtiene todos los representantes.
     *
     * @return
     */
    List<Representante> getAll();

}
