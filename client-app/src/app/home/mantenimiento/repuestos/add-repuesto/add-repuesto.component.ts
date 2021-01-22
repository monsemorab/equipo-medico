import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../../domain/modelo-equipo";
import {Representante} from "../../../../domain/representante";
import {EquipoService} from "../../../../service/equipo.service";
import {ModeloEquipoService} from "../../../../service/modelo-equipo.service";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {RepuestoService} from "../../../../service/repuesto.service";
import {RepresentanteService} from "../../../../service/representante.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-repuesto',
  templateUrl: './add-repuesto.component.html',
  styleUrls: ['./add-repuesto.component.css']
})
export class AddRepuestoComponent implements OnInit {
  // Datos Repuesto
  codigo: string;
  descripcion: string;
  precio: number;
  cantAdquirida: number;
  cantExistente: number;
  tipoEquipo: TipoEquipo;
  modeloEquipo: ModeloEquipo;
  representante: Representante;
  fechaActualizacion: any;
  readonlyField: boolean;
  repuesto: Repuesto;

  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();
  representantes = new Array<Representante>();
  tipoId: any;
  modeloId: any;
  repreId: any;
  addBtnHabilitado = false;

  // error
  errorMessage: string;
  error: boolean;
  info: boolean;

  constructor(private router: Router,
              private equipoService: EquipoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private repuestoService: RepuestoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.tipoId = 'Seleccionar Tipo';
    this.modeloId = 'Seleccionar Modelo';
    this.repreId = 'Seleccionar Representante';
    this.clearRepuestoField();
    this.getAllTipos();
    this.getAllModelos();
    this.getAllRepresentantes();
    this.readonlyField = true;
    this.fechaActualizacion = new Date();
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
        // this.error = true;
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
        // this.error = true;
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
   * Al presionar el boton veririfcar, se realiza la busqueda del repuesto por el campo código.
   */
  verificarCodigoRepuesto() {
    if (this.codigo !== '' && this.codigo != null) {
      this.buscarRepuestoByCodigo(this.codigo);
    }
  }


  /**
   * Se busca el repuesto por el código introducido. Si existe, se notifica al usuario que ya existe ese repuesto,
   * si no existe, se notifica al usuario y se habilitan los campos para ingresar los datos.
   * @param codigo
   */
  buscarRepuestoByCodigo(codigo: string) {
    this.repuestoService.getRepuestoByCodigo(codigo).subscribe(
      repuesto => {
        this.errorMessage = 'Ya existe un repuesto con código ' + codigo;
        this.info = true;
        this.addBtnHabilitado = false;
      },
      error => {
        this.errorMessage = error.error;
        if (this.errorMessage == null && error.status == '404') {
          this.errorMessage = 'No existe repuesto con código ' + codigo + " ingrese los datos requeridos para crearlo";
          this.info = true;
          this.readonlyField = false;
          this.addBtnHabilitado = true;
        } else {
          console.log(this.errorMessage)
          this.error = true;
        }
      }
    );
  }

  /**
   * Se crea el objeto con los datos ingresados para el repuesto.
   */
  addRepuesto() {
    if (typeof this.fechaActualizacion === 'string' || this.fechaActualizacion instanceof String) {
      let parts = this.fechaActualizacion.split('/');
      this.fechaActualizacion =  new Date(+parts[2], +parts[0] - 1, +parts[1]);
    }
    this.repuesto = new Repuesto(null, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantExistente, this.tipoEquipo, this.modeloEquipo, this.representante, this.fechaActualizacion);
    this.crearRepuesto(this.repuesto);

  }

  /**
   * Se crea un nuveo repeusto.
   * @param repuesto
   */
  crearRepuesto(repuesto: Repuesto) {
    this.repuestoService.crearRepuesto(repuesto).subscribe(
      repuesto => {
        this.repuesto = repuesto;
        this.repuestoService.emitExisteRepuesto(true);
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

  /**
   * Se inicializan los valores de los campos.
   */
  clearRepuestoField() {
    this.codigo = '';
    this.descripcion = '';
    this.precio = null;
    this.cantAdquirida = null;
    this.cantExistente = null;
    this.tipoEquipo = null;
    this.modeloEquipo = null;
    this.representante = null;
    this.fechaActualizacion = '';
    this.readonlyField = false;
    this.addBtnHabilitado = false;
  }
}
