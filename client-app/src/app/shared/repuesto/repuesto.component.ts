import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repuesto} from '../../domain/repuesto';
import {TipoEquipo} from '../../domain/tipo-equipo';
import {ModeloEquipo} from '../../domain/modelo-equipo';
import {EquipoService} from '../../service/equipo.service';
import {RepuestoService} from '../../service/repuesto.service';
import {ModeloEquipoService} from '../../service/modelo-equipo.service';
import {TipoEquipoService} from '../../service/tipo-equipo.service';

@Component({
  selector: 'app-repuesto',
  templateUrl: './repuesto.component.html',
  styleUrls: ['./repuesto.component.css']
})
export class RepuestoComponent implements OnInit {

  // modal add/edit repuesto
  modalRepuestoOpen = true;
  modalRepuestoTitle: string;

  // Repuesto
  @Input() repuesto: Repuesto;
  @Input() isEditRepuesto: boolean;
  @Output() repuestoToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditRepuesto: EventEmitter<any> = new EventEmitter();

  // Datos Repuesto
  id: number;
  codigo: string;
  descripcion: string;
  precio: number;
  cantAdquirida: number;
  cantRestante: number;
  tipoEquipo: TipoEquipo;
  modeloEquipo: ModeloEquipo;
  representante: string;
  fechaActualizacion: any;
  readonlyField: boolean;

  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();

  // error
  errorMessage: string;
  error: boolean;


  constructor(private equipoService: EquipoService,
              private modeloEquipoService: ModeloEquipoService,
              private tipoEquipoService: TipoEquipoService,
              private repuestoService: RepuestoService) {
  }

  ngOnInit() {
    this.clearRepuestoField();
    this.getAllTipos();
    this.getAllModelos();

    if (this.repuesto == null) {
      this.modalRepuestoTitle = 'Agregar Repuesto';
      this.id = -1;
    } else {
      this.modalRepuestoTitle = 'Editar Repuesto';
      this.id = this.repuesto.id;
      this.codigo = this.repuesto.codigo;
      this.descripcion = this.repuesto.descripcionArticulo;
      this.precio = this.repuesto.precio;
      this.cantAdquirida = this.repuesto.cantidadAdquirida;
      this.cantRestante = this.repuesto.cantidadRestante;
      this.tipoEquipo = this.repuesto.tipoEquipo;
      this.modeloEquipo = this.repuesto.modeloEquipo;
      this.representante = this.repuesto.representante;
      this.fechaActualizacion = this.repuesto.fechaActualizacion;
      this.isEditRepuesto = true;
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
   * Se selecciona un tipo de equipo.
   * @param {number} value
   */
  onSelectedTipoEquipo(value: number): void {
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
  onSelectedModeloEquipo(value: number): void {
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
   * Al presionar la tecla enter, se realiza la busqueda del repuesto por el campo código.
   * @param value
   */
  onEnterCodigoRepuesto(value: string) {
    this.readonlyField = false;
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
    this.readonlyField = false;
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
        this.id = repuesto.id;
        this.codigo = repuesto.codigo;
        this.descripcion = repuesto.descripcionArticulo;
        this.precio = repuesto.precio;
        this.cantAdquirida = repuesto.cantidadAdquirida;
        this.cantRestante = repuesto.cantidadRestante;
        this.tipoEquipo = repuesto.tipoEquipo;
        this.modeloEquipo = repuesto.modeloEquipo;
        this.representante = repuesto.representante;
        this.fechaActualizacion = repuesto.fechaActualizacion;
        this.readonlyField = true;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.error = true;
      }
    );
  }


  /**
   * Se crea el objeto con los datos ingresados para el repuesto.
   */
  addRepuesto() {
    this.repuesto = new Repuesto(this.id, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantRestante, this.tipoEquipo, this.modeloEquipo, this.representante, this.fechaActualizacion);
    this.repuestoToUpdate.emit(this.repuesto);
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
    this.cantRestante = null;
    this.tipoEquipo = null;
    this.modeloEquipo = null;
    this.representante = '';
    this.fechaActualizacion = '';
    this.readonlyField = false;
  }

}
