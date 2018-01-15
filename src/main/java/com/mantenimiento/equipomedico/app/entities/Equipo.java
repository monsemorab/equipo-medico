package com.mantenimiento.equipomedico.app.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Equipo
 *
 * @author Brenda Quiñonez
 *
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
    private Long numeroSerie;

    @Column(name = "numero_patrimonial")
    private Long numeroPatrimonial;

    @Column(name = "numero_lote")
    private Long numeroLote;

    @Column(name = "fecha_fabricacion")
    private Date fechaFabricacion;

    @Column(name = "fecha_ven_garantia")
    private Date fechaVenGarantia;

    @Column(name = "fecha_instalacion")
    private Date fechaInstalacion;

    @Column(name = "fecha_compra")
    private Date fechaCompra;

    @Column(name = "estado")
    private String estado;

    @Column(name = "alim_electrica")
    private String alimElectrica;

    @Column(name = "version_sw")
    private String versionSw;

    @Column(name = "costo")
    private Float costo;

    @Column(name = "descripcion_equipo")
    private String descripcionEquipo;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="representante_id")
    private Representante representante;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="tipo_equipo_id")
    private TipoEquipo tipoEquipo;

    @Column(name = "modelo_equipo_id")
    private ModeloEquipo modeloEquipo;

    @Column(name = "ubicacion_id")
    private Ubicacion ubicacion;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="contrato_id")
    private Contrato contrato;

    /**
     * Gets numeroSerie
     *
     * @return value of numeroSerie
     */
    public Long getNumeroSerie() {
        return numeroSerie;
    }

    /**
     * Set numeroSerie
     *
     * @param numeroSerie
     */
    public void setNumeroSerie(Long numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    /**
     * Gets numeroPatrimonial
     *
     * @return value of numeroPatrimonial
     */
    public Long getNumeroPatrimonial() {
        return numeroPatrimonial;
    }

    /**
     * Set numeroPatrimonial
     *
     * @param numeroPatrimonial
     */
    public void setNumeroPatrimonial(Long numeroPatrimonial) {
        this.numeroPatrimonial = numeroPatrimonial;
    }

    /**
     * Gets numeroLote
     *
     * @return value of numeroLote
     */
    public Long getNumeroLote() {
        return numeroLote;
    }

    /**
     * Set numeroLote
     *
     * @param numeroLote
     */
    public void setNumeroLote(Long numeroLote) {
        this.numeroLote = numeroLote;
    }

    /**
     * Gets fechaFabricacion
     *
     * @return value of fechaFabricacion
     */
    public Date getFechaFabricacion() {
        return fechaFabricacion;
    }

    /**
     * Set fechaFabricacion
     *
     * @param fechaFabricacion
     */
    public void setFechaFabricacion(Date fechaFabricacion) {
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
     * Gets alimElectrica
     *
     * @return value of alimElectrica
     */
    public String getAlimElectrica() {
        return alimElectrica;
    }

    /**
     * Set alimElectrica
     *
     * @param alimElectrica
     */
    public void setAlimElectrica(String alimElectrica) {
        this.alimElectrica = alimElectrica;
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
