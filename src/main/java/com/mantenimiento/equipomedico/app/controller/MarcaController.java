package com.mantenimiento.equipomedico.app.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import com.mantenimiento.equipomedico.app.entidad.Marca;
import com.mantenimiento.equipomedico.app.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController
{

    @Autowired
    private MarcaService marcaService;

    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService;
    }

    /**
     * Creación de un nueva marca de equipo.
     *
     * @param marca
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Marca> create(@RequestBody Marca marca) throws URISyntaxException {
        Marca result = marcaService.create(marca);
        return ResponseEntity.created(new URI("/api/marcas/" + result.getId()))
                .body(result);
    }

    /**
     * Edición de una marca de equipo existente.
     *
     * @param marca
     * @return
     * @throws URISyntaxException
     */
    @RequestMapping(method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Marca> update(@RequestBody Marca marca) throws URISyntaxException {
        Marca result = marcaService.update(marca);
        return ResponseEntity.created(new URI("/api/marcas/" + result.getId()))
                .body(result);
    }

    /**
     * Obtiene la lista de marcas.
     *
     * @return marcas lista de marcas.
     */
    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Marca> getAll() {
        return marcaService.getAll ();
    }

    /**
     * Obtiene determinada marca.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Marca> get(@PathVariable Long id) {
        Marca marca = marcaService.get(id);
        return Optional.ofNullable(marca)
                .map(result -> new ResponseEntity<>(
                        result,
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
