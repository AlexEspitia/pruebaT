import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Solicitud } from '../models/solicitud';
import { Empleado } from '../models/empleado';
import { SolicitudService } from '../services/solicitud.service';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-solicitud-form',
  templateUrl: './solicitud-form.component.html',
  styleUrls: ['./solicitud-form.component.css']
})
export class SolicitudFormComponent implements OnInit {

  public solicitud: Solicitud = {id:0, codigo:'', descripcion:'', resumen:'', empleado:{id:0}};
  public titulo: string = "Crear Solicitud";
  public empleadosList: Empleado[] = [];
  public solicitudesList: Solicitud[] = [];
  
  constructor(private solicitudService: SolicitudService,
    private empleadoService: EmpleadoService,
    private router:Router, 
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEmpleados();
    this.cargarSolicitud();
    this.loadSolicitudes()
  }

  loadEmpleados(){
    this.empleadoService.getEmpleados().subscribe(data =>{
      this.empleadosList = data
  });
  }
  loadSolicitudes(){
    this.solicitudService.getSolicitudes().subscribe(data =>{
      this.solicitudesList = data
  });
  }
  //Edirar solicitud
  cargarSolicitud(): void{
    this.activateRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.solicitudService.getSolicitudId(id).subscribe((solicitud)=>this.solicitud = solicitud)
      
      }
    });
  }

  //crear solicitud
  createS(): void{
    console.log(this.solicitud)
    if(this.solicitud.codigo!== '' && this.solicitud.descripcion!== ''&& this.solicitud.resumen!== '' ){
    this.solicitudService.createAdd(this.solicitud).subscribe(solicitud =>{
    this.router.navigate(['solicitud'])
    Swal.fire('Nuevo solicitud',`Solicitud ${solicitud.codigo} creado con exito!`, 'success')
    }
   );
  }
  }

  //Update solicitud
  update(): void{
    this.solicitudService.update(this.solicitud).subscribe(solicitud => {
      this.router.navigate(['/solicitud'])
      Swal.fire('Solicitud Actualizada',`Solicitud ${solicitud.codigo} actualizado con exito!`, 'success')
    })
  }
  compareSelect(object1: any, object2: any) {
    if (object1===undefined && object2===undefined) {
      return true;
    }
    return object1 && object2 && object1.id == object2.id;
  }
}
