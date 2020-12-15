package com.mantenimiento.equipomedico.app.repository;

import java.util.List;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;

public interface RepuestoRepositoryCustom
{
	List<Repuesto> getRepuestoByFilter(String tipo, String marca, String modelo);
}
