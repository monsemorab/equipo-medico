package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Modelo del Equipo
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "modelo_equipo")
public class ModeloEquipo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "marca")
    private String marca;

    @Column(name = "clase")
    private String clase;

    @Column(name = "regla_clasificacion")
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
