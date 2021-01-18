package com.mantenimiento.equipomedico.app.repository;

import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepuestoRepository extends CrudRepository<SolicitudRepuesto, Long> {

	List<SolicitudRepuesto> findAllByEstadoEquals(String pendiente);
}
