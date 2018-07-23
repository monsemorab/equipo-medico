package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Ubicacion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UbicacionService {

    /**
     * Creación de un nueva ubicacion.
     *
     * @param ubicacion
     * @return
     */
    Ubicacion create(Ubicacion ubicacion);

    /**
     * Edición de una ubicacion existente.
     *
     * @param ubicacion
     * @return
     */
    Ubicacion update(Ubicacion ubicacion);

    /**
     * Obtiene la ubicación mediante su id.
     *
     * @param id
     * @return
     */
    Ubicacion get(Long id);

    /**
     * Obtiene todas las ubicaciones.
     *
     * @return
     */
    List<Ubicacion> getAll();

}
