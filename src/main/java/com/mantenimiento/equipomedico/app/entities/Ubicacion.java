package com.mantenimiento.equipomedico.app.entities;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Ubicacion del equipo
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "ubicacion")
public class Ubicacion implements Serializable {

    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "servicio")
    private String servicio;

    @Column(name = "bloque")
    private String bloque;

    @Column(name = "nivel")
    private String nivel;

    @Column(name = "numero_sala")
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
