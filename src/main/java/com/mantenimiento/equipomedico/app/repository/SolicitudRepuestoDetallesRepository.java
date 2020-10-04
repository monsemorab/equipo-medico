package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepuestoDetallesRepository extends CrudRepository<SolicitudRepuestoDetalles, Long> {

	List<SolicitudRepuestoDetalles> getAllBySolicitudId(Long solicitudId);
}
