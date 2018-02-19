package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import com.mantenimiento.equipomedico.app.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContratoServiceImpl implements ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    /**
     * Creación de un nuevo contrato.
     *
     * @param contrato
     * @return
     */
    @Override
    public Contrato create(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    /**
     * Edición de un contrato existente.
     *
     * @param contrato
     * @return
     */
    @Override
    public Contrato update(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    /**
     * Obtiene el contrato mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Contrato get(Long id) {
        return contratoRepository.findOne(id);
    }

    /**
     * Obtiene todos los contratos.
     *
     * @return
     */
    @Override
    public List<Contrato> getAll() {
        return (ArrayList<Contrato>)contratoRepository.findAll();
    }
}
