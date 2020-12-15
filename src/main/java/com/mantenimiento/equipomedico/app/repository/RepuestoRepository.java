package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepuestoRepository extends CrudRepository<Repuesto, Long>, RepuestoRepositoryCustom {

	Repuesto getRepuestoByCodigo(String codigo);

	@Query(value = "SELECT * FROM repuesto r " +
		"JOIN solicitud_repuesto_detalles srd ON r.id = srd.repuesto_id\n" +
		"JOIN solicitud_repuesto sr ON srd.solicitud_id = sr.id\n" +
		"JOIN orden_trabajo ot ON sr.id = ot.solicitud_repuesto_id\n" +
		"WHERE ot.equipo_id = ?1", nativeQuery = true)
	List<Repuesto> getAllByEquipoId(Long equipoId);

}
