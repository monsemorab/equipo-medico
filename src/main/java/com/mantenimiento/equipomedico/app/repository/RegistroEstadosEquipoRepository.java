package com.mantenimiento.equipomedico.app.repository;


import com.mantenimiento.equipomedico.app.entidad.RegistroEstadosEquipo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroEstadosEquipoRepository extends CrudRepository<RegistroEstadosEquipo, Long>{

	RegistroEstadosEquipo getRegistroEstadosEquipoByEquipoIdAndFechaFinIsNull(Long equipoId);

}
