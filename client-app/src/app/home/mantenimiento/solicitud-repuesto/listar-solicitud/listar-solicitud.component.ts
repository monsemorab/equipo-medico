import {Component, OnInit} from '@angular/core';
import {SolicitudRepuesto} from '../../../../domain/solicitud-repuesto';
import {SolicitudRepuestoService} from '../../../../service/solicitud-repuesto.service';
import {Router} from '@angular/router';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {

  // solicitud Repuesto
  selectedRepuesto: SolicitudRepuesto;

  // Errors
  errorMessage: string;
  error: boolean;

  // datagrid
  loading = true;
  total: number;
  first = 0;
  rows = 10;
  solicitudRepuestos: SolicitudRepuesto[];


  constructor(private router: Router,
              private solicitudRepuestoService: SolicitudRepuestoService) {
  }

  ngOnInit() {
    this.error = false;
    this.selectedRepuesto = null;
    this.getSolicitudRepuestos();
  }


  /**
   * Se obtiene la lista de todas las solicitudes de repuestos creadas.
   */
  getSolicitudRepuestos(): void {
    this.solicitudRepuestoService.getAllSolicitudRepuestos().subscribe(
      list => {
        this.solicitudRepuestos = list;
        this.formateoFechas();
        this.total = list.length;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error;
        console.log(this.errorMessage)
        this.solicitudRepuestos = [];
        this.loading = false;
      }
    );
  }

  formateoFechas() {
    const datepipe: DatePipe = new DatePipe('en-ES');
    for(let i=0; i< this.solicitudRepuestos.length; i++){
      this.solicitudRepuestos[i].fechaSolicitud = datepipe.transform(this.solicitudRepuestos[i].fechaSolicitud, 'dd-MM-yyyy');
    }
    this.loading = false;
  }

  /**
   * Cuando se presiona el botón Add.
   */
  addSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/solicitud/crear-solicitud-repuesto']);
  }

  /**
   * Cuando se presiona el botón Edit.
   */
  editSolicitudRepuesto() {
    this.router.navigate(['home/mantenimiento/solicitud/editar-solicitud-repuesto/' + this.selectedRepuesto.id]);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.solicitudRepuestos ? this.first === (this.solicitudRepuestos.length - this.rows): true;
  }

  isFirstPage(): boolean {
    return this.solicitudRepuestos ? this.first === 0 : true;
  }

  exportToExcel() {
    // @ts-ignore
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.solicitudRepuestos);
      const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, "solicitudRepuestos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // @ts-ignore
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
