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

    @Column(name = "nombre_generico")
    private String nombreGenerico;

    @Column(name = "indice_gestion_equipo")
    private String indiceGestionEquipo;

    @Column(name = "vida_util")
    private String vidaUtil;

    @Column(name = "codigo_ECRI_UMDNS")
    private String codigoECRI_UMDNS;

    @Column(name = "procedimiento_MP")
    private String procedimientoMP;

    @Column(name = "MP_anho")
    private String MPaño;

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
     * Gets nombreGenerico
     *
     * @return value of nombreGenerico
     */
    public String getNombreGenerico() {
        return nombreGenerico;
    }

    /**
     * Set nombreGenerico
     *
     * @param nombreGenerico
     */
    public void setNombreGenerico(String nombreGenerico) {
        this.nombreGenerico = nombreGenerico;
    }

    /**
     * Gets indiceGestionEquipo
     *
     * @return value of indiceGestionEquipo
     */
    public String getIndiceGestionEquipo() {
        return indiceGestionEquipo;
    }

    /**
     * Set indiceGestionEquipo
     *
     * @param indiceGestionEquipo
     */
    public void setIndiceGestionEquipo(String indiceGestionEquipo) {
        this.indiceGestionEquipo = indiceGestionEquipo;
    }

    /**
     * Gets vidaUtil
     *
     * @return value of vidaUtil
     */
    public String getVidaUtil() {
        return vidaUtil;
    }

    /**
     * Set vidaUtil
     *
     * @param vidaUtil
     */
    public void setVidaUtil(String vidaUtil) {
        this.vidaUtil = vidaUtil;
    }

    /**
     * Gets codigoECRI_UMDNS
     *
     * @return value of codigoECRI_UMDNS
     */
    public String getCodigoECRI_UMDNS() {
        return codigoECRI_UMDNS;
    }

    /**
     * Set codigoECRI_UMDNS
     *
     * @param codigoECRI_UMDNS
     */
    public void setCodigoECRI_UMDNS(String codigoECRI_UMDNS) {
        this.codigoECRI_UMDNS = codigoECRI_UMDNS;
    }

    /**
     * Gets procedimientoMP
     *
     * @return value of procedimientoMP
     */
    public String getProcedimientoMP() {
        return procedimientoMP;
    }

    /**
     * Set procedimientoMP
     *
     * @param procedimientoMP
     */
    public void setProcedimientoMP(String procedimientoMP) {
        this.procedimientoMP = procedimientoMP;
    }

    /**
     * Gets MPaño
     *
     * @return value of MPaño
     */
    public String getMPaño() {
        return MPaño;
    }

    /**
     * Set MPaño
     *
     * @param MPaño
     */
    public void setMPaño(String MPaño) {
        this.MPaño = MPaño;
    }
}
