package com.mantenimiento.equipomedico.app.entidad;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Tipo del Equipo
 *
 * @author Brenda Quiñonez
 *
 */

@Entity
@Table(name = "tipo_equipo")
public class TipoEquipo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "codigo_ECRI_UMDNS")
    private String codigoECRIUMDNS;

    @Column(name = "clase")
    private String clase;

    @Column(name = "MP_anho")
    private String mpano;

    @Column(name = "personal_a_cargo")
    private String personalACargo;

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
     * Gets tipo
     *
     * @return value of tipo
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Set tipo
     *
     * @param tipo
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * Gets codigoECRIUMDNS
     *
     * @return value of codigoECRIUMDNS
     */
    public String getCodigoECRIUMDNS() {
        return codigoECRIUMDNS;
    }

    /**
     * Set codigoECRIUMDNS
     *
     * @param codigoECRIUMDNS
     */
    public void setCodigoECRIUMDNS(String codigoECRIUMDNS) {
        this.codigoECRIUMDNS = codigoECRIUMDNS;
    }

    /**
     * Gets clase
     *
     * @return value of clase
     */
    public String getClase() {
        return clase;
    }

    /**
     * Set clase
     *
     * @param clase
     */
    public void setClase(String clase) {
        this.clase = clase;
    }

    /**
     * Gets mpano
     *
     * @return value of mpano
     */
    public String getMpano() {
        return mpano;
    }

    /**
     * Set mpano
     *
     * @param mpano
     */
    public void setMpano(String mpano) {
        this.mpano = mpano;
    }

    /**
     * Gets personalACargo
     *
     * @return value of personalACargo
     */
    public String getPersonalACargo() {
        return personalACargo;
    }

    /**
     * Set personalACargo
     *
     * @param personalACargo
     */
    public void setPersonalACargo(String personalACargo) {
        this.personalACargo = personalACargo;
    }
}
