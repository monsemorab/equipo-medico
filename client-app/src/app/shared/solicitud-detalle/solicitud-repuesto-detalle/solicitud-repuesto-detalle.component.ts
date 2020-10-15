import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repuesto} from "../../../domain/repuesto";
import {TipoEquipo} from "../../../domain/tipo-equipo";
import {ModeloEquipo} from "../../../domain/modelo-equipo";
import {Representante} from "../../../domain/representante";
import {EquipoService} from "../../../service/equipo.service";
import {ModeloEquipoService} from "../../../service/modelo-equipo.service";
import {TipoEquipoService} from "../../../service/tipo-equipo.service";
import {RepuestoService} from "../../../service/repuesto.service";
import {RepresentanteService} from "../../../service/representante.service";
import {DatePipe} from "@angular/common";
import {SolicitudRepuestoDetalle} from "../../../domain/solicitud-repuesto-detalle";

@Component({
  selector: 'app-solicitud-repuesto-detalle',
  templateUrl: './solicitud-repuesto-detalle.component.html',
  styleUrls: ['./solicitud-repuesto-detalle.component.css']
})
export class SolicitudRepuestoDetalleComponent implements OnInit {

  // modal add/edit repuesto
  modalRepuestoOpen = true;
  modalRepuestoTitle: string;

  // Repuesto
  repuesto: Repuesto;

  // Detalle solicitud repuesto
  @Input() solicitudRepuestoDetalle: SolicitudRepuestoDetalle
  @Input() isAtenderOT: boolean;
  @Input() isEditRepuesto: boolean;
  @Output() detalleRepuestoToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditRepuesto: EventEmitter<any> = new EventEmitter();

  // Datos Repuesto
  idRepuesto: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantAdquirida: number;  // solo lectura
  cantExistente: number;  // solo lectura
  tipoEquipo: TipoEquipo;
  modeloEquipo: ModeloEquipo;
  representante: Representante;
  fechaActualizacion: any;
  readonlyField: boolean;

  // Datos Solicitud Repuesto Detalle
  id: number;
  cantidadSolicitada: number;
  cantidadUsada: number

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


  constructor(private equipoService: EquipoService,
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

    if (this.solicitudRepuestoDetalle == null) {
      this.modalRepuestoTitle = 'Agregar Repuesto';
      this.id = -1;
      this.readonlyField = true;
      this.fechaActualizacion = new Date();
    } else {
      this.modalRepuestoTitle = 'Editar Repuesto';
      this.camposAEditar(this.solicitudRepuestoDetalle);
    }
    this.modalRepuestoOpen = true;
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

  camposAEditar(solicitudRepuesto: SolicitudRepuestoDetalle) {
    // datos de la solicitd de repuesto
    const datepipe: DatePipe = new DatePipe('en-ES');
    this.id = solicitudRepuesto.id;
    this.cantidadSolicitada = solicitudRepuesto.cantidadSolicitada;
    this.cantidadUsada = solicitudRepuesto.cantidadUsada;

    // datos del repuesto
    this.repuesto = solicitudRepuesto.repuesto;
    this.camposAEditarDelRepuesto(this.repuesto);
  }

  camposAEditarDelRepuesto(repuesto: Repuesto) {
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
    this.readonlyField = this.isAtenderOT;
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
   * Al presionar la tecla enter, se realiza la busqueda del repuesto por el campo código.
   * @param value
   */
  onEnterCodigoRepuesto(value: string) {
    if (value !== '' && value != null) {
      this.codigo = value;
      this.buscarRepuestoByCodigo(this.codigo);
    }
  }

  /**
   * Se obtiene el valor introducido en el campo código repuesto.
   * @param value
   */
  onKeyCodigoRepuesto(value: string) {
    this.codigo = value;
  }

  /**
   * Se busca el repuesto por el código introducido. Si existe, se llenan los campos del formulario,
   * si no existe, se muestra un mensaje al usuario.
   * @param codigo
   */
  buscarRepuestoByCodigo(codigo: string) {
    this.repuestoService.getRepuestoByCodigo(codigo).subscribe(
      repuesto => {
        this.camposAEditarDelRepuesto(repuesto);
      },
      error => {
        this.errorMessage = error.error;
        if (this.errorMessage == null && error.status == '404') {
          this.errorMessage = 'No existe repuesto con código ' + this.codigo;
          this.info = true;
          this.readonlyField = false;
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
    this.repuesto = new Repuesto(this.idRepuesto, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantExistente, this.tipoEquipo, this.modeloEquipo, this.representante, this.fechaActualizacion);

    if (this.isEditRepuesto) {
      this.editarRepuestoExistente(this.repuesto);
    } else {
      this.agregarRepuestoCreado(this.repuesto);
    }
  }

  /**
   * Se crea un nuveo repuesto.
   * @param repuesto
   */
  agregarRepuestoCreado(repuesto: Repuesto): void {
    this.repuestoService.crearRepuesto(repuesto).subscribe(
      repuesto => {
        this.repuesto = repuesto;
        this.repuestoService.emitExisteRepuesto(true);
        this.emitSolicitudRepuestoDetalle();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se guardan los datos editados del repuesto seleccionado.
   * @param repuesto
   */
  editarRepuestoExistente(repuesto: Repuesto): void {
    this.repuestoService.editarRepuesto(repuesto).subscribe(
      repuesto => {
        this.repuesto = repuesto;
        this.emitSolicitudRepuestoDetalle();
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }

  emitSolicitudRepuestoDetalle(): void {
    this.solicitudRepuestoDetalle = new SolicitudRepuestoDetalle(this.id, null, this.repuesto, this.cantidadSolicitada, this.cantidadUsada);
    this.detalleRepuestoToUpdate.emit(this.solicitudRepuestoDetalle);
  }

  /**
   * Cuando se cancela la edición o la creación de un repuesto.
   * Si se cancela la edición, el repuesto seleccionado es agregado de nuevo la la lista de repuestos.
   */
  onCancelAddEditRepuesto() {
    this.cancelAddEditRepuesto.emit(this.repuesto);
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
  }

}
