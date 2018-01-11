package com.mantenimiento.equipomedico.app.entities;


import java.io.Serializable;
import java.util.Date;

/**
 * Repuesto para el equipo.
 *
 * @author Brenda Quiñonez
 *
 */
public class Repuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String codigo;
    private String descripcionArticulo;
    private Float precio;
    private Date fechaActualizacion;
    private Integer cantidadAdquirida;
    private Integer cantidadRestante;
    private TipoEquipo tipoEquipo;
    private ModeloEquipo modeloEquipo;
    private Representante representante;

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
     * Gets cantidadRestante
     *
     * @return value of cantidadRestante
     */
    public Integer getCantidadRestante() {
        return cantidadRestante;
    }

    /**
     * Set cantidadRestante
     *
     * @param cantidadRestante
     */
    public void setCantidadRestante(Integer cantidadRestante) {
        this.cantidadRestante = cantidadRestante;
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
     * Gets modeloEquipo
     *
     * @return value of modeloEquipo
     */
    public ModeloEquipo getModeloEquipo() {
        return modeloEquipo;
    }

    /**
     * Set modeloEquipo
     *
     * @param modeloEquipo
     */
    public void setModeloEquipo(ModeloEquipo modeloEquipo) {
        this.modeloEquipo = modeloEquipo;
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
}
