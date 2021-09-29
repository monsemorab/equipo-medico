package com.mantenimiento.equipomedico.app.repository;

import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepuestoDetallesRepository extends CrudRepository<SolicitudRepuestoDetalles, Long> {

	List<SolicitudRepuestoDetalles> getAllBySolicitudId(Long solicitudId);

	@Query(value = "SELECT * FROM solicitud_repuesto_detalles srd  " +
		"JOIN repuesto r ON r.id = srd.repuesto_id\n" +
		"JOIN solicitud_repuesto sr ON srd.solicitud_id = sr.id\n" +
		"JOIN orden_trabajo ot ON sr.id = ot.solicitud_repuesto_id\n" +
		"WHERE ot.equipo_id = ?1 AND cast(ot.fecha_solicitud as date) " +
		"BETWEEN ?2 AND ?3", nativeQuery = true)
	List<SolicitudRepuestoDetalles> getAllByEquipoIdAndFecha(Long equipoId, Date fechaInicio, Date fechaFin);

	@Query(value = "SELECT * FROM solicitud_repuesto_detalles srd  " +
		"JOIN repuesto r ON r.id = srd.repuesto_id\n" +
		"JOIN solicitud_repuesto sr ON srd.solicitud_id = sr.id\n" +
		"JOIN orden_trabajo ot ON sr.id = ot.solicitud_repuesto_id\n" +
		"WHERE ot.equipo_id = ?1", nativeQuery = true)
	List<SolicitudRepuestoDetalles> getAllByEquipoId(Long equipoId);

}
