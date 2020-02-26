package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.entidad.Mantenimiento;
import com.mantenimiento.equipomedico.app.entidad.Representante;
import com.mantenimiento.equipomedico.app.repository.RepresentanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RepresentanteServiceImpl implements RepresentanteService {

    @Autowired
    private RepresentanteRepository representanteRepository;

    /**
     * Creación de un nuevo representante.
     *
     * @param representante
     * @return
     */
    @Override
    public Representante create(Representante representante) {
        return representanteRepository.save(representante);
    }

    /**
     * Edición de un representante existente.
     *
     * @param representante
     * @return
     */
    @Override
    public Representante update(Representante representante) {
        return representanteRepository.save(representante);
    }

    /**
     * Obtiene el representante mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Representante get(Long id) {
        Optional<Representante> entity = representanteRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todos los representantes.
     *
     * @return
     */
    @Override
    public List<Representante> getAll() {
        return (ArrayList<Representante>)representanteRepository.findAll();
    }
}
