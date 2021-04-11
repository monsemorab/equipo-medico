package com.mantenimiento.equipomedico.app.entidad;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Marca del Equipo
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "marca")
public class Marca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "marca")
    private String marca;

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
     * Gets marca
     *
     * @return value of marca
     */
    public String getMarca()
    {
        return marca;
    }

    /**
     * Set marca
     *
     * @param marca
     */
    public void setMarca(String marca)
    {
        this.marca = marca;
    }
}
