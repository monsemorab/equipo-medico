import {Component, OnInit} from '@angular/core';
import {Repuesto} from "../../../../domain/repuesto";
import {TipoEquipo} from "../../../../domain/tipo-equipo";
import {Representante} from "../../../../domain/representante";
import {EquipoService} from "../../../../service/equipo.service";
import {TipoEquipoService} from "../../../../service/tipo-equipo.service";
import {RepuestoService} from "../../../../service/repuesto.service";
import {RepresentanteService} from "../../../../service/representante.service";
import {Router} from "@angular/router";
import {Modelo} from "../../../../domain/modelo";
import {ModeloService} from "../../../../service/modelo.service";
import {Marca} from "../../../../domain/marca";
import {MarcaService} from "../../../../service/marca.service";

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
  representante: Representante;
  fechaActualizacion: any;
  readonlyField: boolean;
  repuesto: Repuesto;

  tipos = new Array<TipoEquipo>();
  representantes = new Array<Representante>();
  tipoEqId: any;
  repreId: any;
  addBtnHabilitado = false;

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

  constructor(private router: Router,
              private equipoService: EquipoService,
              private modeloService: ModeloService,
              private marcaService: MarcaService,
              private tipoEquipoService: TipoEquipoService,
              private repuestoService: RepuestoService,
              private representanteService: RepresentanteService) {
  }

  ngOnInit() {
    this.clearRepuestoField();
    this.readonlyField = true;
    this.fechaActualizacion = new Date();

    this.marcaId = 'Seleccionar Marca';
    this.modeloId = 'Seleccionar Modelo';
    this.repreId = 'Seleccionar Representante';
    this.tipoEqId = 'Seleccionar Tipo';

    this.getAllTipos();
    this.getAllModelos();
    this.getAllMarcas();
    this.getAllRepresentantes();

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
        // this.error = true;
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
   * Se selecciona un representante
   * @param value
   */
  onSelectRepresentante(): void {
    this.getRepresentanteById(this.repreId);
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

  onKeyDescripcionRepuesto(value: string) {
    if(value != "") {
      this.addBtnHabilitado = true;
    } else {
      this.addBtnHabilitado = false;
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
      this.cantExistente, this.tipoEquipo, this.modeloSeleccionado, this.marcaSeleccionada, this.representante,
      this.fechaActualizacion);
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
    this.modeloSeleccionado = null;
    this.marcaSeleccionada = null;
    this.representante = null;
    this.fechaActualizacion = '';
    this.readonlyField = false;
    this.addBtnHabilitado = false;
  }
}
