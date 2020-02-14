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

  // success actions
  successMessage: string;
  success: boolean;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  equipos: Equipo[];

  constructor(private router: Router,
              private equipoService: EquipoService) {
  }

  ngOnInit() {
    this.success = false;
    this.error = false;
    this.selectedEquipo = null;
    this.getAllEquipos();
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
    this.selectedEquipo = equipo;
    console.log('selectedEquipo ', this.selectedEquipo);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editEquipo() {
    this.router.navigate(['home/equipos/editar-equipo/' + this.selectedEquipo.id]);

  }

}

