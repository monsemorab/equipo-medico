package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Contrato
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "contrato")
public class Contrato implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "numero_contrato")
    private Long numeroContrato;

    @Column(name = "nombre_licitacion")
    private String nombreLicitacion;

    @Column(name = "tipo_procedimiento")
    private String tipoProcedimiento;

    @Column(name = "estado_contrato")
    private String estadoContrato;

    @Column(name = "convocante")
    private String convocante;

    @Column(name = "pdf")
    private String pdf;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "representante_id")
    private Representante representante;

    @Column(name = "fecha_inicio")
    private Date fechaInicio;

    @Column(name = "fecha_fin")
    private Date fechaFin;

    /**
     * Gets numeroContrato
     *
     * @return value of numeroContrato
     */
    public Long getNumeroContrato() {
        return numeroContrato;
    }

    /**
     * Set numeroContrato
     *
     * @param numeroContrato
     */
    public void setNumeroContrato(Long numeroContrato) {
        this.numeroContrato = numeroContrato;
    }

    /**
     * Gets nombreLicitacion
     *
     * @return value of nombreLicitacion
     */
    public String getNombreLicitacion() {
        return nombreLicitacion;
    }

    /**
     * Set nombreLicitacion
     *
     * @param nombreLicitacion
     */
    public void setNombreLicitacion(String nombreLicitacion) {
        this.nombreLicitacion = nombreLicitacion;
    }

    /**
     * Gets tipoProcedimiento
     *
     * @return value of tipoProcedimiento
     */
    public String getTipoProcedimiento() {
        return tipoProcedimiento;
    }

    /**
     * Set tipoProcedimiento
     *
     * @param tipoProcedimiento
     */
    public void setTipoProcedimiento(String tipoProcedimiento) {
        this.tipoProcedimiento = tipoProcedimiento;
    }

    /**
     * Gets estadoContrato
     *
     * @return value of estadoContrato
     */
    public String getEstadoContrato() {
        return estadoContrato;
    }

    /**
     * Set estadoContrato
     *
     * @param estadoContrato
     */
    public void setEstadoContrato(String estadoContrato) {
        this.estadoContrato = estadoContrato;
    }

    /**
     * Gets fechaInicio
     *
     * @return value of fechaInicio
     */
    public Date getFechaInicio() {
        return fechaInicio;
    }

    /**
     * Set fechaInicio
     *
     * @param fechaInicio
     */
    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    /**
     * Gets fechaFin
     *
     * @return value of fechaFin
     */
    public Date getFechaFin() {
        return fechaFin;
    }

    /**
     * Set fechaFin
     *
     * @param fechaFin
     */
    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
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
     * Gets convocante
     *
     * @return value of convocante
     */
    public String getConvocante() {
        return convocante;
    }

    /**
     * Set convocante
     *
     * @param convocante
     */
    public void setConvocante(String convocante) {
        this.convocante = convocante;
    }

    /**
     * Gets pdf
     *
     * @return value of pdf
     */
    public String getPdf() {
        return pdf;
    }

    /**
     * Set pdf
     *
     * @param pdf
     */
    public void setPdf(String pdf) {
        this.pdf = pdf;
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
