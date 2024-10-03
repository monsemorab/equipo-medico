package com.mantenimiento.equipomedico.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuesto;
import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import com.mantenimiento.equipomedico.app.repository.SolicitudRepuestoDetallesRepository;
import com.mantenimiento.equipomedico.app.repository.SolicitudRepuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SolicitudRepuestoDetallesServiceImpl implements SolicitudRepuestoDetalleService
{

	@Autowired
	private SolicitudRepuestoDetallesRepository solicitudRepuestoDetallesRepository;
	@Autowired
	private SolicitudRepuestoRepository solicitudRepuestoRepository;

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

	@Override
	public void removeById(long id)
	{
		Optional<SolicitudRepuestoDetalles> solicitudRepuestoDetalles = solicitudRepuestoDetallesRepository.findById(id);
		if(solicitudRepuestoDetalles.isPresent()){
			SolicitudRepuesto solicitud = solicitudRepuestoDetalles.get().getSolicitud();
			List<SolicitudRepuestoDetalles> result = solicitud.getSolicitudRepuestoDetalles()
				.stream()
				.filter(solicitudRepuestoDetalles1 -> solicitudRepuestoDetalles1.getId() != id)
				.collect(Collectors.toList());
			solicitud.setSolicitudRepuestoDetalles(result);
			solicitudRepuestoRepository.save(solicitud);
			solicitudRepuestoDetallesRepository.deleteById(id);
		}
	}
}
