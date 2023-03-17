import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Solicitud } from '../models/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html'

})
export class SolicitudComponent implements OnInit {


  solicitudes: Solicitud[] = [];
  public solicitud: Solicitud = {id:0,codigo:'',descripcion:'',resumen:'',empleado:{id:0}};
 
  constructor(private solicitudService: SolicitudService,
              private route: ActivatedRoute,
              private Route: Router,
              private empleadoService: EmpleadoService
  ) { }

  ngOnInit() {
    this.solicitudService.getSolicitudes().subscribe(
      solicitudes => this.solicitudes = solicitudes
    );
  }
  
   //Edirar solicitud
   cargarSolicitud(): void{
    this.route.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.solicitudService.getSolicitudId(id).subscribe((solicitud)=>this.solicitud = solicitud)
      }
    });
  }

  //Eliminar solcitud
  delete(solicitud: Solicitud): void {

    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar la solicitud ${solicitud.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancela!'
    }).then((result) => {
      if (result.value) {
        this.solicitudService.delete(solicitud.id).subscribe(
          response => {
            this.solicitudes = this.solicitudes.filter(cli => cli !== solicitud)
            Swal.fire(
              'Empleado Eliminado!',
              `Empleado ${solicitud.id} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
