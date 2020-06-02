package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Contrato;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratoRepository extends CrudRepository<Contrato, Long> {

	Contrato getContratoByNumeroContrato(String numeroContrato);
	List<Contrato> getAllByNumeroContratoContains(String numeroContrato);
}
