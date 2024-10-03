package com.mantenimiento.equipomedico.app.entidad;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Tabla intermedia para solicitud de respuesto con repuestos para cargar
 * las cantidades de la solicitud
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "solicitud_repuesto_detalles")
public class SolicitudRepuestoDetalles implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "id")
	private long id;

	@ManyToOne()
	@JoinColumn(name = "solicitud_id")
	@JsonIgnoreProperties(value="solicitudRepuestoDetalles", allowSetters = true)
	private SolicitudRepuesto solicitud;

	@ManyToOne()
	@JoinColumn(name = "repuesto_id")
	private Repuesto repuesto;

	private Integer cantidadSolicitada;

	private Integer cantidadUsada;

	/**
	 * Gets id
	 *
	 * @return value of id
	 */
	public long getId()
	{
		return id;
	}

	/**
	 * Set id
	 *
	 * @param id
	 */
	public void setId(long id)
	{
		this.id = id;
	}

	/**
	 * Gets solicitud
	 *
	 * @return value of solicitud
	 */
	public SolicitudRepuesto getSolicitud()
	{
		return solicitud;
	}

	/**
	 * Set solicitud
	 *
	 * @param solicitud
	 */
	public void setSolicitud(SolicitudRepuesto solicitud)
	{
		this.solicitud = solicitud;
	}

	/**
	 * Gets repuesto
	 *
	 * @return value of repuesto
	 */
	public Repuesto getRepuesto()
	{
		return repuesto;
	}

	/**
	 * Set repuesto
	 *
	 * @param repuesto
	 */
	public void setRepuesto(Repuesto repuesto)
	{
		this.repuesto = repuesto;
	}

	/**
	 * Gets cantidadSolicitada
	 *
	 * @return value of cantidadSolicitada
	 */
	public Integer getCantidadSolicitada()
	{
		return cantidadSolicitada;
	}

	/**
	 * Set cantidadSolicitada
	 *
	 * @param cantidadSolicitada
	 */
	public void setCantidadSolicitada(Integer cantidadSolicitada)
	{
		this.cantidadSolicitada = cantidadSolicitada;
	}

	/**
	 * Gets cantidadUsada
	 *
	 * @return value of cantidadUsada
	 */
	public Integer getCantidadUsada()
	{
		return cantidadUsada;
	}

	/**
	 * Set cantidadUsada
	 *
	 * @param cantidadUsada
	 */
	public void setCantidadUsada(Integer cantidadUsada)
	{
		this.cantidadUsada = cantidadUsada;
	}
}
