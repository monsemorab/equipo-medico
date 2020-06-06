import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EquipoService} from "../service/equipo.service";
import {Equipo} from "../domain/equipo";
import {ContratoService} from "../service/contrato.service";
import {Contrato} from "../domain/contrato";
import {SolicitudRepuesto} from "../domain/solicitud-repuesto";
import {SolicitudRepuestoService} from "../service/solicitud-repuesto.service";
import {OrdenTrabajo} from "../domain/orden-trabajo";
import {OrdenTrabajoService} from "../service/orden-trabajo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  equipos: Equipo[];
  existenEquiposCreados: boolean;

  contratos: Contrato[];
  existenContratosCreados: boolean;

  solicitudRepuestos: SolicitudRepuesto[];
  existenSolicitudesCreadas: boolean;

  ordenTrabajoPendientes: OrdenTrabajo[];
  existenOTPendientes: boolean;

  ordenTrabajoAtendidas: OrdenTrabajo[];
  existenOTAtendidas: boolean;


  // Errors
  errorMessage: string;
  error: boolean;


  constructor(private router: Router,
              private equipoService: EquipoService,
              private contratoService: ContratoService,
              private solicitudRepuestoService: SolicitudRepuestoService,
              private ordenTrabajoService: OrdenTrabajoService) { }

  ngOnInit() {
    this.existenEquiposCreados = false;
    this.existenContratosCreados = false
    this.existenSolicitudesCreadas = false;
    this.existenOTPendientes = false;
    this.existenOTAtendidas = false;
    this.getAllEquipos();
    this.getAllContratos();
    this.getSolicitudRepuestos();
    this.getAllOrdenTrabajoPendientes();
    this.getAllOrdenTrabajoAtendidas();
  }

  /**
   * Se obtiene la lista de todos los equipos.
   */
  getAllEquipos(): void {
    this.equipoService.getAllEquipos().subscribe(
      list => {
        this.equipos = list;
        if(this.equipos.length > 0) {
          this.existenEquiposCreados = true;
        }
        console.log(this.equipos)
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  getAllContratos(): void {
    this.contratoService.getAllContratos().subscribe(
      list => {
        this.contratos = list;
        if(this.contratos.length > 0) {
          this.existenContratosCreados = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.contratos = [];
      }
    );
  }

  getSolicitudRepuestos(): void {
    this.solicitudRepuestoService.getAllSolicitudRepuestos().subscribe(
      list => {
        this.solicitudRepuestos = list;
        if(this.solicitudRepuestos.length > 0) {
          this.existenSolicitudesCreadas = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  getAllOrdenTrabajoPendientes(): void {
    this.ordenTrabajoService.getAllByEstado("Pendiente").subscribe(
      list => {
        this.ordenTrabajoPendientes = list;
        if(this.ordenTrabajoPendientes.length > 0) {
          this.existenOTPendientes = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  getAllOrdenTrabajoAtendidas(): void {
    this.ordenTrabajoService.getAllByEstado("Finalizada").subscribe(
      list => {
        this.ordenTrabajoAtendidas = list;
        if(this.ordenTrabajoAtendidas.length > 0) {
          this.existenOTAtendidas = true;
        }
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
      }
    );
  }

  irPaginaEquipo(): void{
    if(this.existenEquiposCreados) {
      this.router.navigate(['home/equipos/lista-equipo']);
    } else {
      this.router.navigate(['home/equipos/crear-equipo']);
    }
  }

  irPaginaContrato(): void{
    if(this.existenContratosCreados) {
      this.router.navigate(['home/contratos/lista-contrato']);
    } else {
      this.router.navigate(['home/contratos/crear-contrato']);
    }
  }

  irPaginaSolicitudRepuesto(): void{
    if(this.existenSolicitudesCreadas) {
      this.router.navigate(['home/mantenimiento/repuestos/lista-solicitud-repuesto']);
    } else {
      this.router.navigate(['home/mantenimiento/repuestos/crear-solicitud-repuesto']);
    }
  }

  irPaginaOTPendientes(): void{
    if(this.existenOTPendientes) {
      this.router.navigate(['home/mantenimiento/orden-trabajo/lista-orden-trabajo']);
    } else {
      this.router.navigate(['home/mantenimiento/orden-trabajo/crear-orden-trabajo']);
    }
  }

}
