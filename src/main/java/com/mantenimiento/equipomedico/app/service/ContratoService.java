package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import com.mantenimiento.equipomedico.app.entidad.Equipo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    Contrato getContratoByNumeroContrato(String numeroContrato);

    List<Contrato> getContratosByFilter(Map<String, String> customQuery);

}
