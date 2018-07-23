package com.mantenimiento.equipomedico.app.repository;

import com.mantenimiento.equipomedico.app.entidad.SolicitudServicio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudServicioRepository extends CrudRepository<SolicitudServicio, Long> {

}
