import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";
import { Solicitud } from "../models/solicitud";

@Injectable({
    providedIn: 'root'
  })
  export class SolicitudService {
  
    private urlEndPoint: string = "http://localhost:8080/api/solicitudes";
  
    private  httpHeaders= new  HttpHeaders({'Content-Type':'application/json' });
  
  constructor(private http: HttpClient, private router: Router) { }
  
  
  // Listar Solicitud
  getSolicitudes(): Observable < Solicitud[] > {
  
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Solicitud[])
    );
  }
  
  // Crear Solicitud
  createAdd(solicitud: Solicitud) : Observable <Solicitud> {
    return this.http.post<Solicitud>(this.urlEndPoint, solicitud, { headers: this.httpHeaders }).pipe(
      catchError(e=>{
        console.error(e.error.mensaje)
        Swal.fire('Error al crear solicitud',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  
  //Buscar por id Solicitud
  getSolicitudId(id: any): Observable<Solicitud>{
    return this.http.get<Solicitud>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e=>{
        this.router.navigate(['/solicitudes'])
        console.error(e.error.mensaje)
        Swal.fire('Error al buscar Solicitud',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  
  public getSolicitudNombre(idSolicitud: any){
    //Swal.fire('Error al buscar Nombre empleado', 'error');
    return this.http.get<Solicitud>(`${this.urlEndPoint}/nombre/${idSolicitud}`);
  }
  
  //update Solicitud
  update(solicitud: Solicitud):Observable<Solicitud>{
    return this.http.put<Solicitud>(`${this.urlEndPoint}/${solicitud.id}`,solicitud,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje)
        Swal.fire('Error al crear Solicitud',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  
  //Eliminar Solicitud
  delete(id: number): Observable<Solicitud>{
    return this.http.delete<Solicitud>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje)
        Swal.fire('Error al eliminar Solicitud',e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  }