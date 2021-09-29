package com.mantenimiento.equipomedico.app.repository;

import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Mantenimiento;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MantenimientoRepository extends CrudRepository<Mantenimiento, Long> {

	@Query(value = "SELECT * FROM mantenimiento m JOIN " +
		"orden_trabajo ot ON m.id = ot.mantenimiento_id " +
		"WHERE ot.equipo_id = ?1 AND cast(m.fecha_manteniminento as date) "+
		"BETWEEN ?2 AND ?3", nativeQuery = true)
	List<Mantenimiento> getAllByEquipoIdAAndFechaMantenimiento(Long equipoId, Date fechaInicio, Date fechaFin);

	@Query(value = "SELECT * FROM mantenimiento r JOIN " +
		"orden_trabajo ot ON r.id = ot.mantenimiento_id " +
		"WHERE ot.equipo_id = ?1", nativeQuery = true)
	List<Mantenimiento> getAllByEquipoId(Long equipoId);

}
