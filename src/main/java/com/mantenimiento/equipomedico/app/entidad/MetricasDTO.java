package com.mantenimiento.equipomedico.app.entidad;

import java.io.Serializable;

public class MetricasDTO implements Serializable
{
	private static final long serialVersionUID = 1L;
	private Integer totalAverias;
	private Long mediaAverias;
	private Long totalDaysInactive;

	/**
	 * Gets totalAverias
	 *
	 * @return value of totalAverias
	 */
	public Integer getTotalAverias()
	{
		return totalAverias;
	}

	/**
	 * Set totalAverias
	 *
	 * @param totalAverias
	 */
	public void setTotalAverias(Integer totalAverias)
	{
		this.totalAverias = totalAverias;
	}

	/**
	 * Gets mediaAverias
	 *
	 * @return value of mediaAverias
	 */
	public Long getMediaAverias()
	{
		return mediaAverias;
	}

	/**
	 * Set mediaAverias
	 *
	 * @param mediaAverias
	 */
	public void setMediaAverias(Long mediaAverias)
	{
		this.mediaAverias = mediaAverias;
	}

	/**
	 * Gets totalDaysInactive
	 *
	 * @return value of totalDaysInactive
	 */
	public Long getTotalDaysInactive()
	{
		return totalDaysInactive;
	}

	/**
	 * Set totalDaysInactive
	 *
	 * @param totalDaysInactive
	 */
	public void setTotalDaysInactive(Long totalDaysInactive)
	{
		this.totalDaysInactive = totalDaysInactive;
	}
}
