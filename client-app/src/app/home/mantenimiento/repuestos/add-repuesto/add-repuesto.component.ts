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
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-repuesto',
  templateUrl: './add-repuesto.component.html',
  styleUrls: ['./add-repuesto.component.css']
})
export class AddRepuestoComponent implements OnInit {
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
  readonlyField: boolean;
  repuesto: Repuesto;

  //repuestos existentes
  repuestos = new Array<Repuesto>();
  repExistenteId: any;
  isEdit: boolean;
  keyWord : string;
  mostrarRep: boolean;

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


  onSelectRepuesto(): void {
    this.repuestoService.getRepuestoById(this.repExistenteId).subscribe(
      repuesto => {
        const datepipe: DatePipe = new DatePipe('en-ES');
        this.isEdit = true;
        this.repuesto = repuesto;
        this.id = repuesto.id;
        this.codigo = repuesto.codigo;
        this.descripcion = repuesto.descripcionArticulo;
        this.precio = repuesto.precio;
        this.cantAdquirida = repuesto.cantidadAdquirida;
        this.cantExistente = repuesto.cantidadExistente;
        this.fechaActualizacion = datepipe.transform(repuesto.fechaActualizacion, 'MM/dd/yyyy');
        this.tipoEquipo = repuesto.tipoEquipo;
        if (repuesto.tipoEquipo != null) {
          this.tipoEqId = repuesto.tipoEquipo.id;
        }
        if (repuesto.marca != null) {
          this.marcaSeleccionada = repuesto.marca;
          this.marcaId = this.marcaSeleccionada.id;
        }

        if (repuesto.modelo != null) {
          this.modeloSeleccionado = repuesto.modelo;
          this.modeloId = this.modeloSeleccionado.id;
        }
        this.representante = repuesto.representante;
        if (repuesto.representante != null) {
          this.repreId = repuesto.representante.id;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  /**
   * Al presionar la tecla enter, se realiza la busqueda del repuesto por el campo descripcion.
   * @param value
   */
  onEnterDescripcionRepuesto(value: string) {
    if (value !== '' && value != null) {
      this.keyWord = value;
      this.buscarRepuestoBykeyWord(this.keyWord);
    }
  }

  onKeyDescripcionRepuesto(value: string) {
    this.keyWord = value;
  }

  buscarRepuestoBykeyWord(keyWord: string): void {
    this.repuestoService.getRepuestoByKeyWord(keyWord).subscribe(
      list => {
        if(list.length > 0) {
          this.repuestos = list;
          this.mostrarRep = true;
        }

        this.addBtnHabilitado = true;
        this.readonlyField = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.repuestos = [];
        this.mostrarRep = false;
        this.addBtnHabilitado = false;
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

    this.repuesto = new Repuesto(this.id, this.codigo, this.descripcion, this.precio, this.cantAdquirida,
      this.cantExistente, this.tipoEquipo, this.modeloSeleccionado, this.marcaSeleccionada, this.representante,
      this.fechaActualizacion);

    if(this.isEdit) {
      this.editarRepuesto(this.repuesto);
    } else {
      this.crearRepuesto(this.repuesto);
    }
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

  /**
   * Se inicializan los valores de los campos.
   */
  clearRepuestoField() {
    this.id = null;
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
    this.isEdit = false;
    this.keyWord = '';
    this.mostrarRep = false;
  }
}
