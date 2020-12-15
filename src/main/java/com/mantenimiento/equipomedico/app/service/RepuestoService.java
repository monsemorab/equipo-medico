package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Mantenimiento;
import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public interface RepuestoService {

    /**
     * Creación de un nuevo repuesto.
     *
     * @param repuesto
     * @return
     */
    Repuesto create(Repuesto repuesto);

    /**
     * Edición de un repuesto existente.
     *
     * @param repuesto
     * @return
     */
    Repuesto update(Repuesto repuesto);

    /**
     * Obtiene el repuesto mediante su id.
     *
     * @param id
     * @return
     */
    Repuesto get(Long id);

    /**
     * Obtiene todos los repuestos.
     *
     * @return
     */
    List<Repuesto> getAll();

    /**
     * Obtiene el repuesto mediante su código.
     *
     * @param codigo
     * @return
     */
    Repuesto getByCodigo(String codigo);

    List<Repuesto> getRepuestosByFilter(Map<String, String> customQuery);

    List<Repuesto> getAllByEquipoId(Long id, Date fechaInicio, Date fechaFin);
}
