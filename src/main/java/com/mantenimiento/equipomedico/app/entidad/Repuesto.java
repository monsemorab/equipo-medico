package com.mantenimiento.equipomedico.app.entidad;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Repuesto para el equipo.
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "repuesto")
public class Repuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "codigo", unique = true)
    private String codigo;

    @Column(name = "descripcion_articulo")
    private String descripcionArticulo;

    @Column(name = "precio")
    private Float precio;

    @Column(name = "fecha_actualizacion")
    private Date fechaActualizacion;

    @Column(name = "cantidad_adquirida")
    private Integer cantidadAdquirida;

    @Column(name = "cantidad_existente")
    private Integer cantidadExistente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="tipo_equipo_id")
    private TipoEquipo tipoEquipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="modelo_equipo_id")
    private Modelo modelo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="marca_equipo_id")
    private Marca marca;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="representante_id")
    private Representante representante;

    @ManyToMany(mappedBy = "repuestos")
    @JsonIgnore
    List<Contrato> contratos;


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
     * Gets codigo
     *
     * @return value of codigo
     */
    public String getCodigo() {
        return codigo;
    }

    /**
     * Set codigo
     *
     * @param codigo
     */
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    /**
     * Gets descripcionArticulo
     *
     * @return value of descripcionArticulo
     */
    public String getDescripcionArticulo() {
        return descripcionArticulo;
    }

    /**
     * Set descripcionArticulo
     *
     * @param descripcionArticulo
     */
    public void setDescripcionArticulo(String descripcionArticulo) {
        this.descripcionArticulo = descripcionArticulo;
    }

    /**
     * Gets precio
     *
     * @return value of precio
     */
    public Float getPrecio() {
        return precio;
    }

    /**
     * Set precio
     *
     * @param precio
     */
    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    /**
     * Gets fechaActualizacion
     *
     * @return value of fechaActualizacion
     */
    public Date getFechaActualizacion() {
        return fechaActualizacion;
    }

    /**
     * Set fechaActualizacion
     *
     * @param fechaActualizacion
     */
    public void setFechaActualizacion(Date fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    /**
     * Gets cantidadAdquirida
     *
     * @return value of cantidadAdquirida
     */
    public Integer getCantidadAdquirida() {
        return cantidadAdquirida;
    }

    /**
     * Set cantidadAdquirida
     *
     * @param cantidadAdquirida
     */
    public void setCantidadAdquirida(Integer cantidadAdquirida) {
        this.cantidadAdquirida = cantidadAdquirida;
    }

    /**
     * Gets cantidadExistente
     *
     * @return value of cantidadExistente
     */
    public Integer getCantidadExistente()
    {
        return cantidadExistente;
    }

    /**
     * Set cantidadExistente
     *
     * @param cantidadExistente
     */
    public void setCantidadExistente(Integer cantidadExistente)
    {
        this.cantidadExistente = cantidadExistente;
    }

    /**
     * Gets tipoEquipo
     *
     * @return value of tipoEquipo
     */
    public TipoEquipo getTipoEquipo() {
        return tipoEquipo;
    }

    /**
     * Set tipoEquipo
     *
     * @param tipoEquipo
     */
    public void setTipoEquipo(TipoEquipo tipoEquipo) {
        this.tipoEquipo = tipoEquipo;
    }

    /**
     * Gets representante
     *
     * @return value of representante
     */
    public Representante getRepresentante() {
        return representante;
    }

    /**
     * Set representante
     *
     * @param representante
     */
    public void setRepresentante(Representante representante) {
        this.representante = representante;
    }

    /**
     * Gets modelo
     *
     * @return value of modelo
     */
    public Modelo getModelo()
    {
        return modelo;
    }

    /**
     * Set modelo
     *
     * @param modelo
     */
    public void setModelo(Modelo modelo)
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
     * Gets contratos
     *
     * @return value of contratos
     */
    public List<Contrato> getContratos()
    {
        return contratos;
    }

    /**
     * Set contratos
     *
     * @param contratos
     */
    public void setContratos(List<Contrato> contratos)
    {
        this.contratos = contratos;
    }
}
