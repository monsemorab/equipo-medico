package com.mantenimiento.equipomedico.app.repository;


import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.RegistroEstadosEquipo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroEstadosEquipoRepository extends CrudRepository<RegistroEstadosEquipo, Long>{

	RegistroEstadosEquipo getRegistroEstadosEquipoByEquipoIdAndFechaFinIsNull(Long equipoId);

	@Query(value = "SELECT * FROM registro_estados_equipo ree " +
		"WHERE ree.equipo_id = ?1 AND ree.fecha_inicio " +
		"BETWEEN ?2 AND ?3", nativeQuery = true)
	List<RegistroEstadosEquipo> getAllByEquipoIdAAndFechaInicioBetween(Long equipoId, Date fechaInicio, Date fechaFin);

}
