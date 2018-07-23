package com.mantenimiento.equipomedico.app.repository;

import com.mantenimiento.equipomedico.app.entidad.OrdenTrabajo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdenTrabajoRepository extends CrudRepository<OrdenTrabajo, Long> {

}
