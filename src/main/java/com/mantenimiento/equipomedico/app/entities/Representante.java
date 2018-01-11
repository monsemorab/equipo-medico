package com.mantenimiento.equipomedico.app.entities;

import java.io.Serializable;

/**
 * Representante del equipo
 *
 * @author Brenda Quiñonez
 *
 */

public class Representante implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nombre;
    private String direccion;
    private String email;
    private String telefono;

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
     * Gets nombre
     *
     * @return value of nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Set nombre
     *
     * @param nombre
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Gets direccion
     *
     * @return value of direccion
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Set direccion
     *
     * @param direccion
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Gets email
     *
     * @return value of email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Set email
     *
     * @param email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets telefono
     *
     * @return value of telefono
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * Set telefono
     *
     * @param telefono
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
