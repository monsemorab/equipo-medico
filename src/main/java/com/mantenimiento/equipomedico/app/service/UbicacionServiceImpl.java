package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Ubicacion;
import com.mantenimiento.equipomedico.app.repository.UbicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UbicacionServiceImpl implements UbicacionService {

    @Autowired
    private UbicacionRepository ubicacionRepository;

    /**
     * Creación de una nueva ubicacion.
     *
     * @param ubicacion
     * @return
     */
    @Override
    public Ubicacion create(Ubicacion ubicacion) {
        return ubicacionRepository.save(ubicacion);
    }

    /**
     * Edición de una ubicacion existente.
     *
     * @param ubicacion
     * @return
     */
    @Override
    public Ubicacion update(Ubicacion ubicacion) {
        return ubicacionRepository.save(ubicacion);
    }

    /**
     * Obtiene la ubicacion mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Ubicacion get(Long id) {
        Optional<Ubicacion> entity = ubicacionRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todas los ubicaciones.
     *
     * @return
     */
    @Override
    public List<Ubicacion> getAll() {
        return (ArrayList<Ubicacion>)ubicacionRepository.findAll();
    }
}
