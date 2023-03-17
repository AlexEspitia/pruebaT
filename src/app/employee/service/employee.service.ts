import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { DataApiService } from 'src/app/services/data-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _endpoint: string = 'employees';

  constructor(private _dataApi: DataApiService) { }

  public getEmployees(): Observable<Employee[]> {
    return this._dataApi.get<Employee[]>(this._endpoint);
  }

  public createEmployee(body: Employee): Observable<boolean> {
    return this._dataApi.post<Employee>(this._endpoint, body);
  }

  public updateEmployee(body: Employee, id: number): Observable<boolean> {
    return this._dataApi.update<Employee>(this._endpoint, body, id);
  }

  public deleteEmployee(id: number): Observable<boolean>{
    return this._dataApi.delete(this._endpoint, id);
  }

}
