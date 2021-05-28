import { Component, OnInit } from '@angular/core';
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {Representante} from "../../../../domain/representante";
import {Repuesto} from "../../../../domain/repuesto";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {RepuestoService} from "../../../../service/repuesto.service";
import {RepresentanteService} from "../../../../service/representante.service";
import {DatePipe} from "@angular/common";
import {switchMap} from "rxjs/operators";
import {Modelo} from "../../../../domain/modelo";
import {ModeloService} from "../../../../service/modelo.service";
import {Marca} from "../../../../domain/marca";
import {MarcaService} from "../../../../service/marca.service";

@Component({
  selector: 'app-edit-repuesto',
  templateUrl: './edit-repuesto.component.html',
  styleUrls: ['./edit-repuesto.component.css']
})
export class EditRepuestoComponent implements OnInit {

  // Datos Repuesto
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantAdquirida: number;
  cantExistente: number;
  tipoEquipo: TipoEquipo;
  representante: Representante;
  fechaActualizacion: any;
  repuesto: Repuesto;

  tipos = new Array<TipoEquipo>();
  representantes = new Array<Representante>();
  tipoEqId: any;
  repreId: any;

  // Datos Modelo Equipo
  modelos = new Array<Modelo>();
  modeloSeleccionado: Modelo;
  modeloId: any;
  // Datos Marca Equipo
  marcas = new Array<Marca>();
  marcaSeleccionada: Marca;
  marcaId: any;

  // error
  errorMessage: string;
  error: boolean;
  info: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modeloService: ModeloService,
              private marcaService: MarcaService,
              private tipoEquipoService: TipoEquipoService,
              private repuestoService: RepuestoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.tipoEqId = 'Seleccionar Tipo';
    this.marcaId = 'Seleccionar Marca';
    this.modeloId = 'Seleccionar Modelo';
    this.repreId = 'Seleccionar Representante';
    this.getAllTipos();
    this.getAllModelos();
    this.getAllMarcas();
    this.getAllRepresentantes();
    this.fechaActualizacion = new Date();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.repuestoService.getRepuestoById(+params.get('id')))
      ).subscribe(repuesto => {
        this.repuesto = new Repuesto(repuesto.id, repuesto.codigo, repuesto.descripcionArticulo, repuesto.precio,
          repuesto.cantidadAdquirida, repuesto.cantidadExistente, repuesto.tipoEquipo, repuesto.modelo, repuesto.marca,
          repuesto.representante, repuesto.fechaActualizacion);
        this.camposAEditar(this.repuesto);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      });
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(): void {
    this.tipoEquipoService.getAllTipoEquipos().subscribe(
      tipos => {
        this.tipos = tipos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        // this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de modelos existentes para los equipos.
   */
  getAllModelos(): void {
    this.modeloService.getAllModeloEquipo().subscribe(
      modelos => {
        this.modelos= modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de los modelos filtrados por la marca seleccionada.
   * @param marcaId
   */
  getAllModelosByMarca(marcaId): void {
    this.modeloService.getAllModeloByMarca(marcaId).subscribe(
      modelos => {
        this.modelos= modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se obtiene la lista de marcas existentes para los equipos.
   */
  getAllMarcas(): void {
    this.marcaService.getAllMarcaEquipo().subscribe(
      marcas => {
        this.marcas = marcas;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se obtiene la lista de representantes.
   */
  getAllRepresentantes(): void {
    this.representanteService.getAllRepresentantes().subscribe(
      representantes => {
        this.representantes = representantes;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se setean los campos a ser editados del repuesto seleccionado
   * @param repuesto
   */
  camposAEditar(repuesto: Repuesto) {
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = repuesto.id;
    this.codigo = repuesto.codigo;
    this.descripcion = repuesto.descripcionArticulo;
    this.precio = repuesto.precio;
    this.cantAdquirida = repuesto.cantidadAdquirida;
    this.cantExistente = repuesto.cantidadExistente;
    this.fechaActualizacion = datepipe.transform(repuesto.fechaActualizacion, 'MM/dd/yyyy');
    this.tipoEquipo = repuesto.tipoEquipo;
    if(repuesto.tipoEquipo != null) {
      this.tipoEqId = repuesto.tipoEquipo.id;
    }
    if(repuesto.marca != null) {
      this.marcaSeleccionada = repuesto.marca;
      this.marcaId = this.marcaSeleccionada.id;
    }

    if(repuesto.modelo != null) {
      this.modeloSeleccionado = repuesto.modelo;
      this.modeloId = this.modeloSeleccionado.id;
    }
    this.representante = repuesto.representante;
    if(repuesto.representante != null) {
      this.repreId = repuesto.representante.id;
    }
  }


  /**
   * Se obtiene el tipo de equipo seleccionado.
   */
  onSelectTipoEquipo(): void {
    this.tipoEquipoService.getTipoEquipoById(this.tipoEqId).subscribe(
      tipo => {
        this.tipoEquipo = tipo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  /**
   * Se obtiene el representante seleccionado
   */
  onSelectRepresentante(): void {
    this.representanteService.getRepresentanteById(this.repreId).subscribe(
      representante => {
        this.representante = representante;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar un modelo de la lista
   */
  onSelectModelo() {
    this.modeloService.getModeloEquipoById(this.modeloId).subscribe(
      modelo => {
        this.modeloSeleccionado = modelo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Al seleccionar una marca de la lista
   */
  onSelectMarca() {
    this.marcaService.getMarcaEquipoById(this.marcaId).subscribe(
      marca => {
        this.marcaSeleccionada = marca;
        this.getAllModelosByMarca(this.marcaSeleccionada.id);
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  /**
   * Se crea el objeto con los datos editados.
   */
  onEditRepuesto() {
    if (typeof this.fechaActualizacion === 'string' || this.fechaActualizacion instanceof String) {
      let parts = this.fechaActualizacion.split('/');
      this.fechaActualizacion =  new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.repuesto = new Repuesto(this.id, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantExistente, this.tipoEquipo, this.modeloSeleccionado, this.marcaSeleccionada, this.representante,
      this.fechaActualizacion);
    this.editarRepuesto(this.repuesto);

  }

  /**
   * Se guardan los datos editados del repuesto seleccionado.
   * @param repuesto
   */
  editarRepuesto(repuesto: Repuesto) {
    this.repuestoService.editarRepuesto(repuesto).subscribe(
      repuesto => {
        this.repuesto = repuesto;
        this.goBack();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['home/mantenimiento/repuestos/lista-repuestos']);
  }
}
