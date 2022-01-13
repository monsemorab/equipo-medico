package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.repository.ContratoRepository;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ContratoServiceImpl implements ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;
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
        if(contrato.getId() != null){
            Optional<Contrato> contrato1 = contratoRepository.findById(contrato.getId());
            if(contrato1.isPresent()){
                contrato1.get().getEquipos().forEach(e -> {
                    e.setContrato(null);
                    equipoRepository.save(e);
                });
            }
        }
        Contrato cont = contratoRepository.save(contrato);
        contrato.getEquipos().forEach(equipo -> {
            Equipo eq = equipoRepository.findById(equipo.getId()).get();
            eq.setContrato(cont);
            equipoRepository.save(eq);
        });
        return contrato;
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

    @Override
    public Contrato getContratoByNumeroContrato(String numeroContrato)
    {
        return contratoRepository.getContratoByNumeroContrato(numeroContrato);
    }

    @Override
    public List<Contrato> getContratosByFilter(
        Map<String, String> customQuery)
    {
        String id = null;
        String tipoProcedimiento = null;
        String estadoContrato = null;
        if(customQuery.containsKey("tipo")) {
            customQuery.get("tipo");
        }
        if(customQuery.containsKey("id")) {
            id = customQuery.get("id");
        }
        if(customQuery.containsKey("tipoProcedimiento")) {
            tipoProcedimiento = customQuery.get("tipoProcedimiento");
        }
        if(customQuery.containsKey("estadoContrato")) {
            estadoContrato = customQuery.get("estadoContrato");
        }
        return contratoRepository.getContratoByFilter(id, tipoProcedimiento,estadoContrato);
    }
}
