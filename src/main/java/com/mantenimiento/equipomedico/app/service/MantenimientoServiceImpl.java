package com.mantenimiento.equipomedico.app.service;

import com.mantenimiento.equipomedico.app.entidad.Mantenimiento;
import com.mantenimiento.equipomedico.app.entidad.OrdenTrabajo;
import com.mantenimiento.equipomedico.app.repository.MantenimientoRepository;
import com.mantenimiento.equipomedico.app.repository.OrdenTrabajoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MantenimientoServiceImpl implements MantenimientoService {

    @Autowired
    private MantenimientoRepository mantenimientoRepository;

    @Autowired
    private OrdenTrabajoRepository ordenTrabajoRepository;

    /**
     * Creación de un nuevo mantenimiento.
     *
     * @param mantenimiento
     * @return
     */
    @Override
    public Mantenimiento create(Mantenimiento mantenimiento) {
        return mantenimientoRepository.save(mantenimiento);
    }

    /**
     * Edición de un mantenimiento existente.
     *
     * @param mantenimiento
     * @return
     */
    @Override
    public Mantenimiento update(Mantenimiento mantenimiento) {
        return mantenimientoRepository.save(mantenimiento);
    }

    /**
     * Obtiene el mantenimiento mediante su id.
     *
     * @param id
     * @return
     */
    @Override
    public Mantenimiento get(Long id) {
        Optional<Mantenimiento> entity = mantenimientoRepository.findById(id);
        return entity.orElse(null);
    }

    /**
     * Obtiene todos los mantenimientos.
     *
     * @return
     */
    @Override
    public List<Mantenimiento> getAll() {
        return (ArrayList<Mantenimiento>) mantenimientoRepository.findAll();
    }

    @Override
    public List<Mantenimiento> getAllByEquipoId(Long id)
    {
        List<OrdenTrabajo> ordenTrabajoList = ordenTrabajoRepository.getAllByEquipoId(id);
        List<Mantenimiento> mantenimientoList = ordenTrabajoList.stream().
            map(ordenTrabajo -> ordenTrabajo.getMantenimiento()).collect(
            Collectors.toList());
        return mantenimientoList;
    }
}
