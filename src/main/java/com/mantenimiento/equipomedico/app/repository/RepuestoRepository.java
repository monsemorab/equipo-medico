package com.mantenimiento.equipomedico.app.repository;

import java.util.Date;
import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RepuestoRepository extends CrudRepository<Repuesto, Long>, RepuestoRepositoryCustom {

	Repuesto getRepuestoByCodigo(String codigo);

	@Query("select r from Repuesto r where r.descripcionArticulo LIKE %:keyword%")
	List<Repuesto> getRepuestoByKeyword(@Param("keyword") String keyword);


}
