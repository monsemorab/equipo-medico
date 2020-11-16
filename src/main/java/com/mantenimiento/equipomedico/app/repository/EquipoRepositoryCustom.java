package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Equipo;

public interface EquipoRepositoryCustom
{
	List<Equipo> getEquiposByFilter(String tipo, String marca, String modelo, String ubicacion,
		String estadoEquipo, String estadoContrato);
}
