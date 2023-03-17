import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee/service/employee.service';
import { Action } from 'src/app/models/action.model';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeRequest, Request } from 'src/app/models/request.model';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-form-request',
  templateUrl: './form-request.component.html',
  styleUrls: ['./form-request.component.css']
})
export class FormRequestComponent implements OnInit {
  @Output() cancel = new EventEmitter<boolean>();
  @Input() formData: Request = {
    code: '',
    description: '',
    summary: '',
    employee: {
      id:0,
      name: ''
    }
  };
  @Input() action: Action = Action.create;
  public form:any;
  public employeeList: EmployeeRequest[] = [];
  constructor(private _form:FormBuilder, private _service: RequestService, private _employeeService: EmployeeService) { }

  public ngOnInit(): void {
    this._employeeService.getEmployees().subscribe((result: Employee[]) => {
      this.employeeList = result.map((item: Employee) => ({id: item.id, name: item.name}));
    });
    this.form =this._form.group({
      code: [this.formData.code, Validators.required],
      description: [this.formData.description, Validators.required],
      summary: [this.formData.summary, Validators.required],
      employee: [this.formData.employee, Validators.required]
    });
  }

  public saveForm() {
    console.log(this.form.value);
  }
  public cancelForm(): void {
    this.cancel.emit(false);
    this.action = Action.create;
  }

}
