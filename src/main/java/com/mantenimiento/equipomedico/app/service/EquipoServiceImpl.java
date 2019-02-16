package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.entidad.Representante;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import com.mantenimiento.equipomedico.app.repository.ModeloEquipoRepository;
import com.mantenimiento.equipomedico.app.repository.RepresentanteRepository;
import com.mantenimiento.equipomedico.app.repository.TipoEquipoRepository;
import com.mantenimiento.equipomedico.app.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipoServiceImpl implements EquipoService {

    @Autowired
    private EquipoRepository equipoRepository;
    @Autowired
    private ModeloEquipoRepository modeloEquipoRepository;
    @Autowired
    private TipoEquipoRepository tipoEquipoRepository;
    @Autowired
    private RepresentanteRepository representanteRepository;
    @Autowired
    private UbicacionRepository ubicacionRepository;


    /**
     * Creación de un nuevo equipo.
     *
     * @param equipo
     * @return
     */
    @Override
    public Equipo create(Equipo equipo) {
        equipo.setModeloEquipo(modeloEquipoRepository.save(equipo.getModeloEquipo()));
        equipo.setTipoEquipo(tipoEquipoRepository.save(equipo.getTipoEquipo()));
        if(equipo.getRepresentante() != null){
            equipo.setRepresentante(representanteRepository.save(equipo.getRepresentante()));
        }
        if(equipo.getUbicacion() != null){
            equipo.setUbicacion(ubicacionRepository.save(equipo.getUbicacion()));
        }
        return equipoRepository.save(equipo);
    }

    /**
     * Obtiene el equipo mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Equipo get(Long id) {
        return equipoRepository.findOne(id);
    }

    /**
     * Obtiene todos los equipos.
     *
     * @return
     */
    @Override
    public List<Equipo> getAll() {
        return (ArrayList<Equipo>)equipoRepository.findAll();
    }

    /**
     * Obtiene todos los equipos sin contrato
     *
     * @return
     */
    @Override
    public List<Equipo> getSinContrato() {
        return equipoRepository.findAllByContratoIsNull();
    }
}
