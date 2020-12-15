package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.repository.RepuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepuestoServiceImpl implements RepuestoService
{

	@Autowired
	private RepuestoRepository repuestoRepository;

	/**
	 * Creación de un nuevo repuesto.
	 *
	 * @param repuesto
	 * @return
	 */
	@Override
	public Repuesto create(Repuesto repuesto)
	{
		return repuestoRepository.save(repuesto);
	}

	/**
	 * Edición de un repuesto existente.
	 *
	 * @param repuesto
	 * @return
	 */
	@Override
	public Repuesto update(Repuesto repuesto)
	{
		return repuestoRepository.save(repuesto);
	}

	/**
	 * Obtiene el repuesto mediante su id.
	 *
	 * @param id
	 * @return
	 */
	@Override
	public Repuesto get(Long id)
	{
		Optional<Repuesto> entity = repuestoRepository.findById(id);
		return entity.orElse(null);
	}

	/**
	 * Obtiene todos los repuestos.
	 *
	 * @return
	 */
	@Override
	public List<Repuesto> getAll()
	{
		return (ArrayList<Repuesto>)repuestoRepository.findAll();
	}

	/**
	 * Obtiene el repuesto mediante su código.
	 *
	 * @param codigo
	 * @return
	 */

	@Override
	public Repuesto getByCodigo(String codigo)
	{
		return repuestoRepository.getRepuestoByCodigo(codigo);
	}

	@Override
	public List<Repuesto> getRepuestosByFilter(
		Map<String, String> customQuery)
	{
		String tipo = null;
		String marca = null;
		String modelo = null;
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
		return repuestoRepository.getRepuestoByFilter(tipo, marca, modelo);
	}

	@Override
	public List<Repuesto> getAllByEquipoId(Long id)
	{
		return repuestoRepository.getAllByEquipoId(id);
	}
}
