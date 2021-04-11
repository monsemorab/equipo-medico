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
@Table(name = "modelo")
public class Modelo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "modelo")
    private String modelo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "marca_id")
    private Marca marca;

    @Column(name = "imp")
    private String imp;

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
     * Gets modelo
     *
     * @return value of modelo
     */
    public String getModelo()
    {
        return modelo;
    }

    /**
     * Set modelo
     *
     * @param modelo
     */
    public void setModelo(String modelo)
    {
        this.modelo = modelo;
    }

    /**
     * Gets marca
     *
     * @return value of marca
     */
    public Marca getMarca()
    {
        return marca;
    }

    /**
     * Set marca
     *
     * @param marca
     */
    public void setMarca(Marca marca)
    {
        this.marca = marca;
    }

    /**
     * Gets imp
     *
     * @return value of imp
     */
    public String getImp()
    {
        return imp;
    }

    /**
     * Set imp
     *
     * @param imp
     */
    public void setImp(String imp)
    {
        this.imp = imp;
    }
}
