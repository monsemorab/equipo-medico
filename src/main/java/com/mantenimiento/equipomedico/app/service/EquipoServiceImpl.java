package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.Equipo;
import com.mantenimiento.equipomedico.app.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipoServiceImpl implements EquipoService
{

	@Autowired
	private EquipoRepository equipoRepository;


	/**
	 * Creación de un nuevo equipo.
	 *
	 * @param equipo
	 * @return
	 */
	@Override
	public Equipo create(Equipo equipo)
	{
		return equipoRepository.save(equipo);
	}

	/**
	 * Obtiene el equipo mediante su id.
	 *
	 * @param id
	 * @return
	 */
	@Override
	public Equipo get(Long id)
	{
		Optional<Equipo> entity = equipoRepository.findById(id);
		return entity.orElse(null);
	}

	/**
	 * Obtiene todos los equipos.
	 *
	 * @return
	 */
	@Override
	public List<Equipo> getAll()
	{
		return (ArrayList<Equipo>)equipoRepository.findAll();
	}

	/**
	 * Obtiene todos los equipos sin contrato
	 *
	 * @return
	 */
	@Override
	public List<Equipo> getSinContrato()
	{
		return equipoRepository.findAllByContratoIsNull();
	}

	/**
	 * Obtiene el equipo mediante su numero patrimonial.
	 *
	 * @param numeroPatrimonial
	 * @return
	 */
	@Override
	public Equipo getByNumeroPatrimonialAndEstadoEquals(String numeroPatrimonial, String estado)
	{
		return equipoRepository.getEquipoByNumeroPatrimonialAndEstadoEquals(numeroPatrimonial, estado);
	}

	/**
	 * Obtiene el equipo mediante su numero de serie.
	 *
	 * @param numeroSerie
	 * @return
	 */
	@Override
	public Equipo getByNumeroSerieAndEstadoEquals(String numeroSerie, String estado)
	{
		return equipoRepository.getEquipoByNumeroSerieAndEstadoEquals(numeroSerie, estado);
	}

	@Override
	public Equipo getEquiposByNumeroSerieAndNumeroPatrimonialAndEstadoEquals(
		String numeroSerie, String numeroPatrimonial, String estado)
	{
		return getEquiposByNumeroSerieAndNumeroPatrimonialAndEstadoEquals(numeroSerie, numeroPatrimonial, estado);
	}

	@Override
	public List<Equipo> getEquiposByNumeroSerieContains(String numeroSerie)
	{
		return equipoRepository.getEquiposByNumeroSerieContains(numeroSerie);
	}

	@Override
	public List<Equipo> getEquiposByNumeroPatrimonialContains(String numeroPatrimonial)
	{
		return equipoRepository.getEquiposByNumeroPatrimonialContains(numeroPatrimonial);
	}

	@Override
	public List<Equipo> getEquiposByNumeroSerieContainsAndNumeroPatrimonialContains(
		String numeroSerie, String numeroPatrimonial)
	{
		return equipoRepository.getEquiposByNumeroSerieContainsAndNumeroPatrimonialContains(
			numeroSerie, numeroPatrimonial);
	}

	@Override
	public List<Equipo> getEquiposByFilter(
		Map<String, String> customQuery)
	{
		String tipo = null;
		String marca = null;
		String modelo = null;
		String servicio = null;
		String estadoEquipo = null;
		String estadoContrato = null;
		if(customQuery.containsKey("tipo")) {
			customQuery.get("tipo");
		}
		if(customQuery.containsKey("tipo")) {
			tipo = customQuery.get("tipo");
		}
		if(customQuery.containsKey("marca")) {
			marca = customQuery.get("marca");
		}
		if(customQuery.containsKey("modelo")) {
			modelo = customQuery.get("modelo");
		}
		if(customQuery.containsKey("servicio")) {
			servicio = customQuery.get("servicio");
		}
		if(customQuery.containsKey("estadoEquipo")) {
			estadoEquipo = customQuery.get("estadoEquipo");
		}
		if(customQuery.containsKey("estadoContrato")) {
			estadoContrato = customQuery.get("estadoContrato");
		}

		return equipoRepository.getEquiposByFilter(tipo, marca, modelo, servicio, estadoEquipo, estadoContrato);
	}

}
