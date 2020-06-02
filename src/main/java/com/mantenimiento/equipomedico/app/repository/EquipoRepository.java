package com.mantenimiento.equipomedico.app.repository;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipoRepository extends CrudRepository<Equipo, Long> {

    List<Equipo> findAllByContratoIsNull();

    Equipo getEquipoByNumeroPatrimonial(String numeroPatrimonial);

    Equipo getEquipoByNumeroSerie(String numeroSerie);

    List<Equipo> getEquiposByNumeroSerieContainsAndNumeroPatrimonialContains(String numeroSerie, String numeroPatrimonial);
}
