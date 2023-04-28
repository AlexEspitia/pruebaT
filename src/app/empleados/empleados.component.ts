import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
  
})
export class EmpleadosComponent implements OnInit {

   empleados: Empleado[]=[];
  
  constructor(private empleadoService: EmpleadoService) { }

 /*  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort; */


  ngOnInit() {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  //Eliminar empleado
  delete(empleado: Empleado): void{
  
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar el empleado ${empleado.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancela!'
      }).then((result) => {
      if (result.value) {
        this.empleadoService.delete(empleado.id).subscribe(
          response => {
            this.empleados = this.empleados.filter(cli => cli !== empleado)
            Swal.fire(
              'Empleado Eliminado!',
              `Empleado ${empleado.nombre} eliminado con éxito.`,
              'success'
          )
          } 
        )  
       }
    })
  }
}