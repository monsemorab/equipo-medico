package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import com.mantenimiento.equipomedico.app.repository.ContratoRepository;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import com.mantenimiento.equipomedico.app.repository.RepresentanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContratoServiceImpl implements ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;
    @Autowired
    private RepresentanteRepository representanteRepository;
    @Autowired
    private EquipoRepository equipoRepository;

    /**
     * Creación de un nuevo contrato.
     *
     * @param contrato
     * @return
     */
    @Override
    public Contrato create(Contrato contrato) {
        if(contrato.getRepresentante() != null){
            contrato.setRepresentante(representanteRepository.save(contrato.getRepresentante()));
        }
        Contrato cont = contratoRepository.save(contrato);
        contrato.getEquipos().forEach(equipo -> {
            equipo.setContrato(cont);
            equipoRepository.save(equipo);
        });
        return cont;
    }

    /**
     * Obtiene el contrato mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Contrato get(Long id) {
        Optional<Contrato> entity = contratoRepository.findById(id);
        return entity.orElse(null);
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
