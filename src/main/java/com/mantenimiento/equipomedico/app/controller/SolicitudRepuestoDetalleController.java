package com.mantenimiento.equipomedico.app.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.SolicitudRepuestoDetalles;
import com.mantenimiento.equipomedico.app.service.SolicitudRepuestoDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/solicitudrepuestosdetalles")
public class SolicitudRepuestoDetalleController
{

	@Autowired
	private SolicitudRepuestoDetalleService solicitudRepuestoDetalleService;

	public SolicitudRepuestoDetalleController(SolicitudRepuestoDetalleService solicitudRepuestoDetalleService)
	{
		this.solicitudRepuestoDetalleService = solicitudRepuestoDetalleService;
	}

	/**
	 * Creación de una nueva solicitud de repuesto detalles.
	 *
	 * @param solicitudRepuestoDetalles
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SolicitudRepuestoDetalles> create(
		@RequestBody SolicitudRepuestoDetalles solicitudRepuestoDetalles) throws URISyntaxException
	{
		SolicitudRepuestoDetalles result = solicitudRepuestoDetalleService.create(solicitudRepuestoDetalles);
		return ResponseEntity.created(new URI("/api/solicitudrepuestosdetalles/" + result.getId()))
			.body(result);
	}

	/**
	 * Edición de una solicitud de repuesto detalles existente.
	 *
	 * @param solicitudRepuestoDetalles
	 * @return
	 * @throws URISyntaxException
	 */
	@RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SolicitudRepuestoDetalles> update(
		@RequestBody SolicitudRepuestoDetalles solicitudRepuestoDetalles) throws URISyntaxException
	{
		SolicitudRepuestoDetalles result = solicitudRepuestoDetalleService.update(solicitudRepuestoDetalles);
		return ResponseEntity.created(new URI("/api/solicitudrepuestosdetalles/" + result.getId()))
			.body(result);
	}

	/**
	 * Obtiene la lista de solicitudes de repuesto detalles.
	 *
	 * @return lista de solicitudes de repuesto detalles.
	 */
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SolicitudRepuestoDetalles> getAll()
	{
		return solicitudRepuestoDetalleService.getAll();
	}

	/**
	 * Obtiene determinada solicitud de repuesto.
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SolicitudRepuestoDetalles> get(@PathVariable Long id)
	{
		SolicitudRepuestoDetalles solicitudRepuestoDetalles = solicitudRepuestoDetalleService.get(id);
		return Optional.ofNullable(solicitudRepuestoDetalles)
			.map(result -> new ResponseEntity<>(
				result,
				HttpStatus.OK))
			.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/**
	 * Obtiene la lista de solicitudes de repuesto detalles by solicitud id.
	 *
	 * @return lista de solicitudes de repuesto detalles.
	 */
	@RequestMapping(value = "/by-solicitud-id/{solicitudId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SolicitudRepuestoDetalles> getAllBySolicitudId(@PathVariable Long solicitudId)
	{
		return solicitudRepuestoDetalleService.getBySolicitudId(solicitudId);
	}

	@RequestMapping(value = "by-equipo-and-fecha", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SolicitudRepuestoDetalles> getAllByEquipoIdAndFecha(@RequestParam Long id,
		@RequestParam Date fechaInicio, @RequestParam Date fechaFin) {
		return solicitudRepuestoDetalleService.getAllByEquipoIdAndFecha(id, fechaInicio, fechaFin);
	}

	@RequestMapping(value = "by-equipo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SolicitudRepuestoDetalles> getAllByEquipoId(@RequestParam Long id) {
		return solicitudRepuestoDetalleService.getAllByEquipoId(id);
	}

	/**
	 * Elimina un detalle de solicitud de repuesto.
	 *
	 * @param id
	 * @return
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<SolicitudRepuestoDetalles> removeSolicitudRepuestoDetalleById(@PathVariable("id") Long id)
	{
		solicitudRepuestoDetalleService.removeById(id);
		return ResponseEntity.noContent().build();
	}

}
