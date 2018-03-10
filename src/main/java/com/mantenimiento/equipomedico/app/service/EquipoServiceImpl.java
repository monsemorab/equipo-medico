package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EquipoServiceImpl implements EquipoService {

    @Autowired
    private EquipoRepository equipoRepository;

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
     * Edición de un equipo existente.
     *
     * @param equipo
     * @return
     */
    @Override
    public Equipo update(Equipo equipo) {
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
}
