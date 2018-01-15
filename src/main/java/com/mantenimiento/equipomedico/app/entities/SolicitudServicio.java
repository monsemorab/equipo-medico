package com.mantenimiento.equipomedico.app.entities;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Solicitud de servicio para el mantenimiento
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "solicitud_servicio")
public class SolicitudServicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_solicitud")
    private Date fechaSolicitud;

    @Column(name = "tarea")
    private String tarea;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="representante_id")
    private Representante responsable;

    @Column(name = "estado")
    private String estado;

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
     * Gets fechaSolicitud
     *
     * @return value of fechaSolicitud
     */
    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    /**
     * Set fechaSolicitud
     *
     * @param fechaSolicitud
     */
    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    /**
     * Gets tarea
     *
     * @return value of tarea
     */
    public String getTarea() {
        return tarea;
    }

    /**
     * Set tarea
     *
     * @param tarea
     */
    public void setTarea(String tarea) {
        this.tarea = tarea;
    }

    /**
     * Gets responsable
     *
     * @return value of responsable
     */
    public Representante getResponsable() {
        return responsable;
    }

    /**
     * Set responsable
     *
     * @param responsable
     */
    public void setResponsable(Representante responsable) {
        this.responsable = responsable;
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
}
