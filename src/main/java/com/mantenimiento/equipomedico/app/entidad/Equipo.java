package com.mantenimiento.equipomedico.app.entidad;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Equipo
 *
 * @author Brenda Quiñonez
 */
@Entity
@Table(name = "equipo")
public class Equipo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "numero_serie")
    private String numeroSerie;

    @Column(name = "numero_patrimonial")
    private String numeroPatrimonial;

    @Column(name = "numero_lote")
    private String numeroLote;

    @Column(name = "estado")
    private String estado;

    @Column(name = "version_sw")
    private String versionSw;

    @Column(name = "descripcion_equipo")
    private String descripcionEquipo;

    @Column(name = "costo")
    private Float costo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "representante_id")
    private Representante representante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_equipo_id")
    private TipoEquipo tipoEquipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "modelo_equipo_id")
    private ModeloEquipo modeloEquipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ubicacion_id")
    private Ubicacion ubicacion;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "contrato_id")
    @JsonIgnoreProperties("equipos")
    private Contrato contrato;

    @Column(name = "licitacion_compra")
    private String licitacionCompra;

    @Column(name = "fecha_fabricacion")
    private String fechaFabricacion;

    @Column(name = "fecha_ven_garantia")
    private Date fechaVenGarantia;

    @Column(name = "fecha_instalacion")
    private Date fechaInstalacion;

    @Column(name = "fecha_compra")
    private Date fechaCompra;
    

    /**
     * Gets numeroSerie
     *
     * @return value of numeroSerie
     */
    public String getNumeroSerie() {
        return numeroSerie;
    }

    /**
     * Set numeroSerie
     *
     * @param numeroSerie
     */
    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    /**
     * Gets numeroPatrimonial
     *
     * @return value of numeroPatrimonial
     */
    public String getNumeroPatrimonial() {
        return numeroPatrimonial;
    }

    /**
     * Set numeroPatrimonial
     *
     * @param numeroPatrimonial
     */
    public void setNumeroPatrimonial(String numeroPatrimonial) {
        this.numeroPatrimonial = numeroPatrimonial;
    }

    /**
     * Gets numeroLote
     *
     * @return value of numeroLote
     */
    public String getNumeroLote() {
        return numeroLote;
    }

    /**
     * Set numeroLote
     *
     * @param numeroLote
     */
    public void setNumeroLote(String numeroLote) {
        this.numeroLote = numeroLote;
    }

    /**
     * Gets fechaFabricacion
     *
     * @return value of fechaFabricacion
     */
    public String getFechaFabricacion()
    {
        return fechaFabricacion;
    }

    /**
     * Gets licitacionCompra
     *
     * @return value of licitacionCompra
     */
    public String getLicitacionCompra()
    {
        return licitacionCompra;
    }

    /**
     * Set licitacionCompra
     *
     * @param licitacionCompra
     */
    public void setLicitacionCompra(String licitacionCompra)
    {
        this.licitacionCompra = licitacionCompra;
    }

    /**
     * Set fechaFabricacion
     *
     * @param fechaFabricacion
     */
    public void setFechaFabricacion(String fechaFabricacion)
    {
        this.fechaFabricacion = fechaFabricacion;
    }

    /**
     * Gets fechaVenGarantia
     *
     * @return value of fechaVenGarantia
     */
    public Date getFechaVenGarantia() {
        return fechaVenGarantia;
    }

    /**
     * Set fechaVenGarantia
     *
     * @param fechaVenGarantia
     */
    public void setFechaVenGarantia(Date fechaVenGarantia) {
        this.fechaVenGarantia = fechaVenGarantia;
    }

    /**
     * Gets fechaInstalacion
     *
     * @return value of fechaInstalacion
     */
    public Date getFechaInstalacion() {
        return fechaInstalacion;
    }

    /**
     * Set fechaInstalacion
     *
     * @param fechaInstalacion
     */
    public void setFechaInstalacion(Date fechaInstalacion) {
        this.fechaInstalacion = fechaInstalacion;
    }

    /**
     * Gets fechaCompra
     *
     * @return value of fechaCompra
     */
    public Date getFechaCompra() {
        return fechaCompra;
    }

    /**
     * Set fechaCompra
     *
     * @param fechaCompra
     */
    public void setFechaCompra(Date fechaCompra) {
        this.fechaCompra = fechaCompra;
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
     * Gets versionSw
     *
     * @return value of versionSw
     */
    public String getVersionSw() {
        return versionSw;
    }

    /**
     * Set versionSw
     *
     * @param versionSw
     */
    public void setVersionSw(String versionSw) {
        this.versionSw = versionSw;
    }

    /**
     * Gets costo
     *
     * @return value of costo
     */
    public Float getCosto() {
        return costo;
    }

    /**
     * Set costo
     *
     * @param costo
     */
    public void setCosto(Float costo) {
        this.costo = costo;
    }

    /**
     * Gets descripcionEquipo
     *
     * @return value of descripcionEquipo
     */
    public String getDescripcionEquipo() {
        return descripcionEquipo;
    }

    /**
     * Set descripcionEquipo
     *
     * @param descripcionEquipo
     */
    public void setDescripcionEquipo(String descripcionEquipo) {
        this.descripcionEquipo = descripcionEquipo;
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
     * Gets ubicacion
     *
     * @return value of ubicacion
     */
    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    /**
     * Set ubicacion
     *
     * @param ubicacion
     */
    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

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
     * Gets contrato
     *
     * @return value of contrato
     */
    public Contrato getContrato() {
        return contrato;
    }

    /**
     * Set contrato
     *
     * @param contrato
     */
    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
    }
}
