package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContratoService {

    /**
     * Creación de un nuevo contrato.
     *
     * @param contrato
     * @return
     */
    Contrato create(Contrato contrato);

    /**
     * Edición de un contrato existente.
     *
     * @param contrato
     * @return
     */
    Contrato update(Contrato contrato);

    /**
     * Obtiene el contrato mediante su id.
     *
     * @param id
     * @return
     */
    Contrato get(Long id);

    /**
     * Obtiene todos los contratos.
     *
     * @return
     */
    List<Contrato> getAll();

}
