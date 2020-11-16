package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Contrato;

public interface ContratoRepositoryCustom
{
	List<Contrato> getContratoByFilter(String numeroContrato, String tipoProcedimiento, String estadoContrato);
}
