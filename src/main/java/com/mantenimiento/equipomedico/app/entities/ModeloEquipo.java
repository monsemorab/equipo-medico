package com.mantenimiento.equipomedico.app.entities;

import java.io.Serializable;

/**
 * Modelo del Equipo
 *
 * @author Brenda Quiñonez
 *
 */
public class ModeloEquipo implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String modelo;
    private String marca;
    private String clase;
    private String reglaClasificacion;

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
     * Gets modelo
     *
     * @return value of modelo
     */
    public String getModelo() {
        return modelo;
    }

    /**
     * Set modelo
     *
     * @param modelo
     */
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    /**
     * Gets marca
     *
     * @return value of marca
     */
    public String getMarca() {
        return marca;
    }

    /**
     * Set marca
     *
     * @param marca
     */
    public void setMarca(String marca) {
        this.marca = marca;
    }

    /**
     * Gets clase
     *
     * @return value of clase
     */
    public String getClase() {
        return clase;
    }

    /**
     * Set clase
     *
     * @param clase
     */
    public void setClase(String clase) {
        this.clase = clase;
    }

    /**
     * Gets reglaClasificacion
     *
     * @return value of reglaClasificacion
     */
    public String getReglaClasificacion() {
        return reglaClasificacion;
    }

    /**
     * Set reglaClasificacion
     *
     * @param reglaClasificacion
     */
    public void setReglaClasificacion(String reglaClasificacion) {
        this.reglaClasificacion = reglaClasificacion;
    }


}
