package com.mantenimiento.equipomedico.app.entidad;

import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Tabla para registro de cambios de estados de Equipo
 *
 * @author Brenda Quiñonez
 */
@Entity
@Table(name = "registro_estados_equipo")
public class RegistroEstadosEquipo
{

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	@Column(name = "equipo_id")
	private Long equipoId;

	@Column(name = "estado")
	private String estado;

	@Column(name = "fecha_inicio")
	private LocalDateTime fechaInicio;

	@Column(name = "fecha_fin")
	private LocalDateTime fechaFin;

	/**
	 * Gets id
	 *
	 * @return value of id
	 */
	public Long getId()
	{
		return id;
	}

	/**
	 * Set id
	 *
	 * @param id
	 */
	public void setId(Long id)
	{
		this.id = id;
	}

	/**
	 * Gets equipoId
	 *
	 * @return value of equipoId
	 */
	public Long getEquipoId()
	{
		return equipoId;
	}

	/**
	 * Set equipoId
	 *
	 * @param equipoId
	 */
	public void setEquipoId(Long equipoId)
	{
		this.equipoId = equipoId;
	}

	/**
	 * Gets estado
	 *
	 * @return value of estado
	 */
	public String getEstado()
	{
		return estado;
	}

	/**
	 * Set estado
	 *
	 * @param estado
	 */
	public void setEstado(String estado)
	{
		this.estado = estado;
	}

	/**
	 * Gets fechaInicio
	 *
	 * @return value of fechaInicio
	 */
	public LocalDateTime getFechaInicio()
	{
		return fechaInicio;
	}

	/**
	 * Set fechaInicio
	 *
	 * @param fechaInicio
	 */
	public void setFechaInicio(LocalDateTime fechaInicio)
	{
		this.fechaInicio = fechaInicio;
	}

	/**
	 * Gets fechaFin
	 *
	 * @return value of fechaFin
	 */
	public LocalDateTime getFechaFin()
	{
		return fechaFin;
	}

	/**
	 * Set fechaFin
	 *
	 * @param fechaFin
	 */
	public void setFechaFin(LocalDateTime fechaFin)
	{
		this.fechaFin = fechaFin;
	}
}
