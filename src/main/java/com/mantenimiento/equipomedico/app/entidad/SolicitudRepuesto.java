package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Solicitud de Repuesto para el mantenimiento
 *
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "solicitud_repuesto")
public class SolicitudRepuesto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_solicitud")
    private Date fechaSolicitud;

    @Column(name = "estado")
    private String estado;

    @OneToMany()
    private List<Repuesto> repuestos;

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
     * Gets repuestos
     *
     * @return value of repuestos
     */
    public List<Repuesto> getRepuestos() {
        return repuestos;
    }

    /**
     * Set repuestos
     *
     * @param repuestos
     */
    public void setRepuestos(List<Repuesto> repuestos) {
        this.repuestos = repuestos;
    }
}
