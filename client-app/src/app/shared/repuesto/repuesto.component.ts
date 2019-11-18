import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Repuesto} from "../../domain/repuesto";
import {TipoEquipo} from "../../domain/tipo-equipo";
import {ModeloEquipo} from "../../domain/modelo-equipo";
import {EquipoService} from "../../service/equipo.service";

@Component({
  selector: 'app-repuesto',
  templateUrl: './repuesto.component.html',
  styleUrls: ['./repuesto.component.css']
})
export class RepuestoComponent implements OnInit {

  // modal add/edit repuesto
  modalRepuestoOpen = false;
  modalRepuestoTitle: string;

  // Repuesto
  @Input() repuesto: Repuesto;
  @Input() isEditRepuesto: boolean;
  @Output() repuestoToUpdate: EventEmitter<any> = new EventEmitter();
  @Output() cancelAddEditRepuesto: EventEmitter<any> = new EventEmitter();

  // Datos Repuesto
  public id: number;
  public codigo: string;
  public descripcion: string;
  public precio: number;
  public cantAdquirida: number;
  public cantRestante: number;
  public tipoEquipo: TipoEquipo;
  public modeloEquipo: ModeloEquipo;
  public representante: string;
  public fechaActualizacion: any;

  tipos = new Array<TipoEquipo>();
  modelos = new Array<ModeloEquipo>();

  // error
  errorMessage: string;
  error: boolean;


  constructor(private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.clearRepuestoField();
    this.getAllTipos();
    this.getAllModelos();

    if (this.repuesto == null) {
      this.modalRepuestoTitle = 'Crear Repuesto';
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
      this.representante = this.repuesto.representante
      this.fechaActualizacion = this.repuesto.fechaActualizacion;
      this.isEditRepuesto = true;
    }
    this.modalRepuestoOpen = true;
  }

  /**
   * Se obtiene la lista de tipos de equipos.
   */
  getAllTipos(): void {
    this.equipoService.getTipoEquipos().subscribe(
      tipos => {
        this.tipos = tipos;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
      }
    );
  }

  /**
   * Se obtiene la lista de modelos para los equipos.
   */
  getAllModelos(): void {
    this.equipoService.getModeloEquipos().subscribe(
      modelos => {
        this.modelos = modelos;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
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
    this.equipoService.getTipoEquipoById(id).subscribe(
      tipo => {
        this.tipoEquipo = tipo;
      },
      error => {
        this.errorMessage = error;
        this.error = true;
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
    this.equipoService.getModeloEquipoById(id).subscribe(
      modelo => {
        this.modeloEquipo = modelo;
      },
      error => {
        this.errorMessage = error;
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
  }

}
