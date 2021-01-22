package com.mantenimiento.equipomedico.app.repository;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipoRepository extends CrudRepository<Equipo, Long> , EquipoRepositoryCustom{

    List<Equipo> findAllByContratoIsNull();

    Equipo getEquipoByNumeroPatrimonialAndEstadoEquals(String numeroPatrimonial, String estado);

    Equipo getEquipoByNumeroSerieEquals(String numeroSerie);

    Equipo getEquiposByNumeroSerieAndNumeroPatrimonialEquals(String numeroSerie, String numeroPatrimonial);

    List<Equipo> getEquiposByNumeroSerieContains(String numeroSerie);

    List<Equipo> getEquiposByNumeroPatrimonialContains(String numeroSerie);

    List<Equipo> getEquiposByNumeroSerieContainsAndNumeroPatrimonialContains(String numeroSerie, String numeroPatrimonial);

}
