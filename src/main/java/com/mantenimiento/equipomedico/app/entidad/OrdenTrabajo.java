package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "estado")
    private String estado;

    @OneToMany(
        cascade = CascadeType.MERGE,
        orphanRemoval = true
    )
    private List<Equipo> equipos  = new ArrayList<>();;

    @Column(name = "tipo_servicio")
    private String tipoServicio;

    @Column(name = "diagnostico")
    private String diagnostico;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne()
    @JoinColumn(name="solicitud_repuesto_id")
    private SolicitudRepuesto solicitudRepuesto;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne()
    @JoinColumn(name="mantenimiento_id")
    private Mantenimiento mantenimiento;

    // Para el tipo de servicio PREVENTIVO
    @Column(name = "fechaRealizacion")
    private Date fechaRealizacion;

    @Column(name= "responsable")
   private String responsable;

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
     * Gets estado
     *
     * @return value of estado
     */
    public String getEstado()
    {
        return estado;
    }

    /**
     * Set estado
     *
     * @param estado
     */
    public void setEstado(String estado)
    {
        this.estado = estado;
    }

    /**
     * Gets equipos
     *
     * @return value of equipos
     */
    public List<Equipo> getEquipos()
    {
        return equipos;
    }

    /**
     * Set equipos
     *
     * @param equipos
     */
    public void setEquipos(List<Equipo> equipos)
    {
        this.equipos = equipos;
    }

    /**
     * Gets tipoServicio
     *
     * @return value of tipoServicio
     */
    public String getTipoServicio()
    {
        return tipoServicio;
    }

    /**
     * Set tipoServicio
     *
     * @param tipoServicio
     */
    public void setTipoServicio(String tipoServicio)
    {
        this.tipoServicio = tipoServicio;
    }

    /**
     * Gets diagnostico
     *
     * @return value of diagnostico
     */
    public String getDiagnostico()
    {
        return diagnostico;
    }

    /**
     * Set diagnostico
     *
     * @param diagnostico
     */
    public void setDiagnostico(String diagnostico)
    {
        this.diagnostico = diagnostico;
    }

    /**
     * Gets solicitudRepuesto
     *
     * @return value of solicitudRepuesto
     */
    public SolicitudRepuesto getSolicitudRepuesto()
    {
        return solicitudRepuesto;
    }

    /**
     * Set solicitudRepuesto
     *
     * @param solicitudRepuesto
     */
    public void setSolicitudRepuesto(SolicitudRepuesto solicitudRepuesto)
    {
        this.solicitudRepuesto = solicitudRepuesto;
    }

    /**
     * Gets mantenimiento
     *
     * @return value of mantenimiento
     */
    public Mantenimiento getMantenimiento()
    {
        return mantenimiento;
    }

    /**
     * Set mantenimiento
     *
     * @param mantenimiento
     */
    public void setMantenimiento(Mantenimiento mantenimiento)
    {
        this.mantenimiento = mantenimiento;
    }

    /**
     * Gets fechaRealizacion
     *
     * @return value of fechaRealizacion
     */
    public Date getFechaRealizacion()
    {
        return fechaRealizacion;
    }

    /**
     * Set fechaRealizacion
     *
     * @param fechaRealizacion
     */
    public void setFechaRealizacion(Date fechaRealizacion)
    {
        this.fechaRealizacion = fechaRealizacion;
    }

    /**
     * Gets responsable
     *
     * @return value of responsable
     */
    public String getResponsable()
    {
        return responsable;
    }

    /**
     * Set responsable
     *
     * @param responsable
     */
    public void setResponsable(String responsable)
    {
        this.responsable = responsable;
    }
}
