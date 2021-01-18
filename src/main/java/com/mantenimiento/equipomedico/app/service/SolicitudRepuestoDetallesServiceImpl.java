package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.Repuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import com.mantenimiento.equipomedico.app.repository.SolicitudRepuestoDetallesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SolicitudRepuestoDetallesServiceImpl implements SolicitudRepuestoDetalleService
{

	@Autowired
	private SolicitudRepuestoDetallesRepository solicitudRepuestoDetallesRepository;

	/**
	 * Creación de una nueva solicitud de repuesto detalle.
	 *
	 * @param solicitudRepuestoDetalles
	 * @return
	 */
	@Override
	public SolicitudRepuestoDetalles create(SolicitudRepuestoDetalles solicitudRepuestoDetalles)
	{
		return solicitudRepuestoDetallesRepository.save(solicitudRepuestoDetalles);
	}

	/**
	 * Edición de una solicitud de repuesto detalle existente.
	 *
	 * @param solicitudRepuestoDetalles
	 * @return
	 */
	@Override
	public SolicitudRepuestoDetalles update(SolicitudRepuestoDetalles solicitudRepuestoDetalles)
	{
		return solicitudRepuestoDetallesRepository.save(solicitudRepuestoDetalles);
	}

	/**
	 * Obtiene la solicitud de repuesto detalle mediante su id.
	 *
	 * @param id
	 * @return
	 */
	@Override
	public SolicitudRepuestoDetalles get(Long id)
	{
		Optional<SolicitudRepuestoDetalles> entity = solicitudRepuestoDetallesRepository.findById(id);
		return entity.orElse(null);
	}

	/**
	 * Obtiene todas las solicitudes de repuestos detalles.
	 *
	 * @return
	 */
	@Override
	public List<SolicitudRepuestoDetalles> getAll()
	{
		return (ArrayList<SolicitudRepuestoDetalles>)solicitudRepuestoDetallesRepository.findAll();
	}

	/**
	 * Obtiene todas las solicitudes de repuestos detalles que tengan ese solicitud id.
	 *
	 * @return
	 */
	@Override
	public List<SolicitudRepuestoDetalles> getBySolicitudId(Long solicitudId)
	{
		return (ArrayList<SolicitudRepuestoDetalles>)solicitudRepuestoDetallesRepository.getAllBySolicitudId(
			solicitudId);
	}

	@Override
	public List<SolicitudRepuestoDetalles> getAllByEquipoIdAndFecha(Long id, Date fechaInicio, Date fechaFin)
	{
		return solicitudRepuestoDetallesRepository.getAllByEquipoIdAndFecha(id,fechaInicio, fechaFin);
	}

	@Override
	public List<SolicitudRepuestoDetalles> getAllByEquipoId(Long id)
	{
		return solicitudRepuestoDetallesRepository.getAllByEquipoId(id);
	}

}
