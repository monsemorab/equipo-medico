package com.mantenimiento.equipomedico.app.entities;

import java.io.Serializable;
import java.util.Date;

/**
 * Registro del mantenimiento.
 *
 * @author Brenda Quiñonez
 *
 */
public class Mantenimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private Date fechaMantenimiento;
    private String tareaRealizada;
    private Integer informeNumero;
    private String estado;
    private String nombreTecnico;

    /**
     * Gets id
     *
     * @return value of id
     */
    public Long getId() {
        return id;
    }

    /**
     * Set id
     *
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets fechaMantenimiento
     *
     * @return value of fechaMantenimiento
     */
    public Date getFechaMantenimiento() {
        return fechaMantenimiento;
    }

    /**
     * Set fechaMantenimiento
     *
     * @param fechaMantenimiento
     */
    public void setFechaMantenimiento(Date fechaMantenimiento) {
        this.fechaMantenimiento = fechaMantenimiento;
    }

    /**
     * Gets tareaRealizada
     *
     * @return value of tareaRealizada
     */
    public String getTareaRealizada() {
        return tareaRealizada;
    }

    /**
     * Set tareaRealizada
     *
     * @param tareaRealizada
     */
    public void setTareaRealizada(String tareaRealizada) {
        this.tareaRealizada = tareaRealizada;
    }

    /**
     * Gets informeNumero
     *
     * @return value of informeNumero
     */
    public Integer getInformeNumero() {
        return informeNumero;
    }

    /**
     * Set informeNumero
     *
     * @param informeNumero
     */
    public void setInformeNumero(Integer informeNumero) {
        this.informeNumero = informeNumero;
    }

    /**
     * Gets estado
     *
     * @return value of estado
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Set estado
     *
     * @param estado
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Gets nombreTecnico
     *
     * @return value of nombreTecnico
     */
    public String getNombreTecnico() {
        return nombreTecnico;
    }

    /**
     * Set nombreTecnico
     *
     * @param nombreTecnico
     */
    public void setNombreTecnico(String nombreTecnico) {
        this.nombreTecnico = nombreTecnico;
    }
}
