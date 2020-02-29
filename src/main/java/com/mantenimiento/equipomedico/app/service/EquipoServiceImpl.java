package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.entidad.Representante;
import com.mantenimiento.equipomedico.app.entidad.Ubicacion;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import com.mantenimiento.equipomedico.app.repository.ModeloEquipoRepository;
import com.mantenimiento.equipomedico.app.repository.RepresentanteRepository;
import com.mantenimiento.equipomedico.app.repository.TipoEquipoRepository;
import com.mantenimiento.equipomedico.app.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        Optional<Equipo> entity = equipoRepository.findById(id);
        return entity.orElse(null);
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

    /**
     * Obtiene el equipo mediante su numero patrimonial.
     *
     * @param numeroPatrimonial
     * @return
     */
    @Override
    public Equipo getByNumeroPatrimonial(String numeroPatrimonial) {
        return equipoRepository.getEquipoByNumeroPatrimonial(numeroPatrimonial);
    }

    /**
     * Obtiene el equipo mediante su numero de serie.
     *
     * @param numeroSerie
     * @return
     */
    @Override
    public Equipo getByNumeroSerie(String numeroSerie) {
        return equipoRepository.getEquipoByNumeroSerie(numeroSerie);
    }
}
