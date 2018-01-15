package com.mantenimiento.equipomedico.app.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Orden de trabajo para el equipo.
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "orden_trabajo")
public class OrdenTrabajo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * Tipos de servicios
     */
    public enum SERVICIOS {PREVENTIVO, CORRECTIVO}

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha")
    private Date fecha;

    @Column(name = "estado")
    private String estado;

    @Column(name = "equipo")
    private Equipo equipo;

    @Column(name = "tipo_servicio")
    private SERVICIOS tipoServicio;

    @Column(name = "diagnostico")
    private String diagnostico;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="solicitud_repuesto_id")
    private SolicitudRepuesto solicitudRepuesto;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="solicitud_servicio_id")
    private SolicitudServicio solicitudServicio;

    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="mantenimiento_id")
    private Mantenimiento mantenimiento;

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
     * Gets fecha
     *
     * @return value of fecha
     */
    public Date getFecha() {
        return fecha;
    }

    /**
     * Set fecha
     *
     * @param fecha
     */
    public void setFecha(Date fecha) {
        this.fecha = fecha;
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
     * Gets equipo
     *
     * @return value of equipo
     */
    public Equipo getEquipo() {
        return equipo;
    }

    /**
     * Set equipo
     *
     * @param equipo
     */
    public void setEquipo(Equipo equipo) {
        this.equipo = equipo;
    }

    /**
     * Gets tipoServicio
     *
     * @return value of tipoServicio
     */
    public SERVICIOS getTipoServicio() {
        return tipoServicio;
    }

    /**
     * Set tipoServicio
     *
     * @param tipoServicio
     */
    public void setTipoServicio(SERVICIOS tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    /**
     * Gets diagnostico
     *
     * @return value of diagnostico
     */
    public String getDiagnostico() {
        return diagnostico;
    }

    /**
     * Set diagnostico
     *
     * @param diagnostico
     */
    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    /**
     * Gets solicitudRepuesto
     *
     * @return value of solicitudRepuesto
     */
    public SolicitudRepuesto getSolicitudRepuesto() {
        return solicitudRepuesto;
    }

    /**
     * Set solicitudRepuesto
     *
     * @param solicitudRepuesto
     */
    public void setSolicitudRepuesto(SolicitudRepuesto solicitudRepuesto) {
        this.solicitudRepuesto = solicitudRepuesto;
    }

    /**
     * Gets solicitudServicio
     *
     * @return value of solicitudServicio
     */
    public SolicitudServicio getSolicitudServicio() {
        return solicitudServicio;
    }

    /**
     * Set solicitudServicio
     *
     * @param solicitudServicio
     */
    public void setSolicitudServicio(SolicitudServicio solicitudServicio) {
        this.solicitudServicio = solicitudServicio;
    }

    /**
     * Gets mantenimiento
     *
     * @return value of mantenimiento
     */
    public Mantenimiento getMantenimiento() {
        return mantenimiento;
    }

    /**
     * Set mantenimiento
     *
     * @param mantenimiento
     */
    public void setMantenimiento(Mantenimiento mantenimiento) {
        this.mantenimiento = mantenimiento;
    }
}
