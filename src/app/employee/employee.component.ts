import { Component, OnInit } from '@angular/core';
import { Action } from '../models/action.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public data: Employee[] = [];
  public enableFrom: boolean = false;
  public crud = Action;
  public dataForm: Employee = {
    id: 0,
    name: '',
    salary: 0
  };
  constructor(private _service: EmployeeService) { }

  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this._service.getEmployees().subscribe((result: Employee[]) => {
      this.data = [...result];
    });
  }
  public setForm(action: Action, employee: Employee) {
    switch (action) {
      case this.crud.create:
        this.enableFrom = true;
        this.dataForm = {...employee};
        break;
      case this.crud.update:
        this.enableFrom = true;
        this.dataForm = {...employee};
        break;
      case this.crud.delete:
        break;
      default:
        break;
    }
  }

  public clearForm(enable: boolean): void {
    this.enableFrom = enable;
    this.dataForm = {
      id: 0,
      name: '',
      salary: 0
    };
  }
}
