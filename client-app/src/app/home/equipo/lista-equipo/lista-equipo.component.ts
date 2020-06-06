import {Component, OnInit} from '@angular/core';
import {EquipoService} from "../../../service/equipo.service";
import {Equipo} from "../../../domain/equipo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-equipo',
  templateUrl: './lista-equipo.component.html',
  styleUrls: ['./lista-equipo.component.css']
})
export class ListaEquipoComponent implements OnInit {

  // equipo
  selectedEquipo: Equipo;
  numeroSerie: string;
  numeroPatrimonial: string;

  // Errors
  errorMessage: string;
  error: boolean;
  infoMessage: string;
  info: boolean;

  // datagrid
  loading = true;
  total: number;
  equipos: Equipo[];

  constructor(private router: Router,
              private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.info = false;
    this.error = false;
    this.selectedEquipo = null;
    this.numeroSerie = "";
    this.numeroPatrimonial = "";
    this.getAllEquipos();
  }

  filtrarEquipo(): void {
    this.info = false;
    this.infoMessage = "";
    if (this.numeroSerie == "" && this.numeroPatrimonial == "") {
      this.getAllEquipos();
    } else {
      let equipo = new Equipo(null, this.numeroSerie, this.numeroPatrimonial, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null);
      this.getAllEquiposFiltrados(equipo);
    }
  }


  /**
   * Se obtiene la lista de todos los equipos.
   */
  getAllEquipos(): void {
    this.equipoService.getAllEquipos().subscribe(
      list => {
        this.equipos = list;
        this.total = list.length;
        this.loading = false;
        console.log(this.equipos)
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.equipos = [];
        this.loading = false;
      }
    );
  }

  getAllEquiposFiltrados(equipo: Equipo): void {
    this.equipoService.getEquiposFiltrados(equipo).subscribe(
      list => {
        this.equipos = list;
        this.total = list.length;
        this.loading = false;
        if (this.total == 0) {
          this.info = true;
          this.infoMessage = "No se encontraron registros para esta busqueda.";
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.equipos = [];
        this.loading = false;
      }
    );
  }

  /**
   * Cuando se presiona el botón Add.
   */
  addEquipo() {
    this.router.navigate(['home/equipos/crear-equipo']);
  }

  /**
   * Cuando se selecciona un Equipo de la lista.
   * @param {Equipo} equipo
   */
  selectEquipo(equipo: Equipo): void {
    if (this.selectedEquipo != null && this.selectedEquipo.id == equipo.id) {
      this.selectedEquipo = null;
    } else {
      this.selectedEquipo = equipo;
    }

    console.log('selectedEquipo ', this.selectedEquipo);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editEquipo() {
    this.router.navigate(['home/equipos/editar-equipo/' + this.selectedEquipo.id]);

  }

}

