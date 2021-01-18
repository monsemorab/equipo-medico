package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Registro del mantenimiento.
 * Registro del servicio
 * @author Brenda Quiñonez
 *
 */
@Entity
@Table(name = "mantenimiento")
public class Mantenimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "fecha_manteniminento")
    private Date fechaMantenimiento;

    @Column(name = "tarea_realizada")
    private String tareaRealizada;

    @Column(name = "informe_numero")
    private Integer informeNumero;

    @Column(name = "nombre_tecnico")
    private String nombreTecnico;

    @Column(name = "tipo_servicio")
    private String tipoServicio;

    @Column(name = "estado")
    private String estadoEquipo;

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
     * Gets fechaMantenimiento
     *
     * @return value of fechaMantenimiento
     */
    public Date getFechaMantenimiento() {
        return fechaMantenimiento;
    }

    /**
     * Set fechaMantenimiento
     *
     * @param fechaMantenimiento
     */
    public void setFechaMantenimiento(Date fechaMantenimiento) {
        this.fechaMantenimiento = fechaMantenimiento;
    }

    /**
     * Gets tareaRealizada
     *
     * @return value of tareaRealizada
     */
    public String getTareaRealizada() {
        return tareaRealizada;
    }

    /**
     * Set tareaRealizada
     *
     * @param tareaRealizada
     */
    public void setTareaRealizada(String tareaRealizada) {
        this.tareaRealizada = tareaRealizada;
    }

    /**
     * Gets informeNumero
     *
     * @return value of informeNumero
     */
    public Integer getInformeNumero() {
        return informeNumero;
    }

    /**
     * Set informeNumero
     *
     * @param informeNumero
     */
    public void setInformeNumero(Integer informeNumero) {
        this.informeNumero = informeNumero;
    }


    /**
     * Gets nombreTecnico
     *
     * @return value of nombreTecnico
     */
    public String getNombreTecnico() {
        return nombreTecnico;
    }

    /**
     * Set nombreTecnico
     *
     * @param nombreTecnico
     */
    public void setNombreTecnico(String nombreTecnico) {
        this.nombreTecnico = nombreTecnico;
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
     * Gets estadoEquipo
     *
     * @return value of estadoEquipo
     */
    public String getEstadoEquipo()
    {
        return estadoEquipo;
    }

    /**
     * Set estadoEquipo
     *
     * @param estadoEquipo
     */
    public void setEstadoEquipo(String estadoEquipo)
    {
        this.estadoEquipo = estadoEquipo;
    }
}
