package com.mantenimiento.equipomedico.app.entities;

import java.io.Serializable;

/**
 * Ubicacion del equipo
 *
 * @author Brenda Quiñonez
 *
 */

public class Ubicacion implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String servicio;
    private String bloque;
    private String nivel;
    private String numeroSala;

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
     * Gets servicio
     *
     * @return value of servicio
     */
    public String getServicio() {
        return servicio;
    }

    /**
     * Set servicio
     *
     * @param servicio
     */
    public void setServicio(String servicio) {
        this.servicio = servicio;
    }

    /**
     * Gets bloque
     *
     * @return value of bloque
     */
    public String getBloque() {
        return bloque;
    }

    /**
     * Set bloque
     *
     * @param bloque
     */
    public void setBloque(String bloque) {
        this.bloque = bloque;
    }

    /**
     * Gets nivel
     *
     * @return value of nivel
     */
    public String getNivel() {
        return nivel;
    }

    /**
     * Set nivel
     *
     * @param nivel
     */
    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    /**
     * Gets numeroSala
     *
     * @return value of numeroSala
     */
    public String getNumeroSala() {
        return numeroSala;
    }

    /**
     * Set numeroSala
     *
     * @param numeroSala
     */
    public void setNumeroSala(String numeroSala) {
        this.numeroSala = numeroSala;
    }
}
