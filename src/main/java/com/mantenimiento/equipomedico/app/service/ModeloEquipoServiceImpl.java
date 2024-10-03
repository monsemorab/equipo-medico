package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Modelo;
import com.mantenimiento.equipomedico.app.repository.ModeloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ModeloEquipoServiceImpl implements ModeloEquipoService {

    @Autowired
    private ModeloRepository modeloEquipoRepository;

    /**
     * Creación de un nuevo modeloEquipo.
     *
     * @param modeloEquipo
     * @return
     */
    @Override
    public Modelo create(Modelo modeloEquipo) {
        // primero se controla que el modelo no exista
        List<Modelo> modelos = modeloEquipoRepository.getAllByMarca_Id(modeloEquipo.getMarca().getId());
        Modelo modeloExistente = modelos.stream()
            .filter(modelo -> modelo.getModelo().equalsIgnoreCase(modeloEquipo.getModelo()))
            .findFirst().orElse(null);

        // si el modelo ya existe se envia los datos del mismo
        if(Objects.nonNull(modeloExistente)) {
            return modeloExistente;
        }
        // si el modelo no existe, se crea uno nuevo
        return modeloEquipoRepository.save(modeloEquipo);
    }

    /**
     * Edición de un modeloEquipo existente.
     *
     * @param modeloEquipo
     * @return
     */
    @Override
    public Modelo update(Modelo modeloEquipo) {
        return modeloEquipoRepository.save(modeloEquipo);
    }

    /**
     * Obtiene el modeloEquipo mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Modelo get(Long id) {
        Optional<Modelo> entity = modeloEquipoRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todos los modeloEquipos.
     *
     * @return
     */
    @Override
    public List<Modelo> getAll() {
        return (ArrayList<Modelo>)modeloEquipoRepository.findAll();
    }

    /**
     * Trae todos los modelos de determinada marca
     * @param marcaId
     * @return
     */
    @Override
    public List<Modelo> getAllModelosByMarca(Long marcaId)
    {
        return modeloEquipoRepository.getAllByMarca_Id(marcaId);
    }
}
