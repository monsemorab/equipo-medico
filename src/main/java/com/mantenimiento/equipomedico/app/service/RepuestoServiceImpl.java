package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.List;
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
}
