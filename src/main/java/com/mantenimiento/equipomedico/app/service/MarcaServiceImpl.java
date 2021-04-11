package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.Marca;
import com.mantenimiento.equipomedico.app.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarcaServiceImpl implements MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    /**
     * Creación de un nueva marca.
     *
     * @param marca
     * @return
     */
    @Override
    public Marca create(Marca marca) {
        return marcaRepository.save(marca);
    }

    /**
     * Edición de una marca existente.
     *
     * @param marca
     * @return
     */
    @Override
    public Marca update(Marca marca) {
        return marcaRepository.save(marca);
    }

    /**
     * Obtiene la marca mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Marca get(Long id) {
        Optional<Marca> entity = marcaRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todos las marcas.
     *
     * @return
     */
    @Override
    public List<Marca> getAll() {
        return (ArrayList<Marca>)marcaRepository.findAll();
    }
}
