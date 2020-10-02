import { Component, OnInit } from '@angular/core';
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../../domain/modelo-equipo";
import {Representante} from "../../../../domain/representante";
import {Repuesto} from "../../../../domain/repuesto";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ModeloEquipoService} from "../../../../service/modelo-equipo.service";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {RepuestoService} from "../../../../service/repuesto.service";
import {RepresentanteService} from "../../../../service/representante.service";
import {DatePipe} from "@angular/common";
import {switchMap} from "rxjs/operators";

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
  cantRestante: number;
  tipoEquipo: TipoEquipo;
  modeloEquipo: ModeloEquipo;
  representante: Representante;
  fechaActualizacion: any;
  repuesto: Repuesto;

  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();
  representantes = new Array<Representante>();
  tipoId: any;
  modeloId: any;
  repreId: any;

  // error
  errorMessage: string;
  error: boolean;
  info: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private repuestoService: RepuestoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.tipoId = 'Seleccionar Tipo';
    this.modeloId = 'Seleccionar Modelo';
    this.repreId = 'Seleccionar Representante';
    this.getAllTipos();
    this.getAllModelos();
    this.getAllRepresentantes();
    this.fechaActualizacion = new Date();

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.repuestoService.getRepuestoById(+params.get('id')))
      ).subscribe(repuesto => {
        this.repuesto = new Repuesto(repuesto.id, repuesto.codigo, repuesto.descripcionArticulo, repuesto.precio,
          repuesto.cantidadAdquirida, repuesto.cantidadRestante, repuesto.tipoEquipo, repuesto.modeloEquipo,
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
   * Se obtiene la lista de modelos para los equipos.
   */
  getAllModelos(): void {
    this.modeloEquipoService.getAllModelosEquipos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        // this.error = true;
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
    this.cantRestante = repuesto.cantidadRestante;
    this.fechaActualizacion = datepipe.transform(repuesto.fechaActualizacion, 'MM/dd/yyyy');
    this.tipoEquipo = repuesto.tipoEquipo;
    if(repuesto.tipoEquipo != null) {
      this.tipoId = repuesto.tipoEquipo.id;
    }
    this.modeloEquipo = repuesto.modeloEquipo;
    if(repuesto.modeloEquipo != null) {
      this.modeloId = repuesto.modeloEquipo.id;
    }
    this.representante = repuesto.representante;
    if(repuesto.representante != null) {
      this.repreId = repuesto.representante.id;
    }
  }

  /**
   * Se selecciona un tipo de equipo.
   * @param {number} value
   */
  onSelectedTipoEquipo(value): void {
    this.getTipoEquipoById(value);
  }

  /**
   * Se obtiene el tipo de equipo seleccionado.
   * @param {number} id
   */
  getTipoEquipoById(id: number): void {
    this.tipoEquipoService.getTipoEquipoById(id).subscribe(
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
   * Se selecciona un modelo.
   * @param {number} value
   */
  onSelectedModeloEquipo(value): void {
    this.getModeloEquipoById(value);
  }

  /**
   * Se obtiene el modelo seleccionado.
   * @param {number} id
   */
  getModeloEquipoById(id: number): void {
    this.modeloEquipoService.getModeloEquipoById(id).subscribe(
      modelo => {
        this.modeloEquipo = modelo;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  /**
   * Se selecciona un representante
   * @param value
   */
  onSelectedRepresentante(value): void {
    this.getRepresentanteById(value);
  }

  /**
   * Se obtiene el representante seleccionado
   * @param id
   */
  getRepresentanteById(id: number): void {
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
   * Se crea el objeto con los datos editados.
   */
  onEditRepuesto() {
    if (typeof this.fechaActualizacion === 'string' || this.fechaActualizacion instanceof String) {
      let parts = this.fechaActualizacion.split('/');
      this.fechaActualizacion =  new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.repuesto = new Repuesto(this.id, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantRestante, this.tipoEquipo, this.modeloEquipo, this.representante, this.fechaActualizacion);
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
