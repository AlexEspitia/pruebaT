import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Action } from 'src/app/models/action.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  @Output() cancel = new EventEmitter<boolean>();
  @Input() formData: Employee = {
    id: 0,
    name: '',
    salary: 0
  };
  @Input() action: Action = Action.create;
  public form:any;
  constructor(private _form:FormBuilder, private _service: EmployeeService) { }

  public ngOnInit(): void {
    this.form =this._form.group({
      name: [this.formData.name, Validators.required],
      salary: [this.formData.salary, Validators.required]
    });
  }

  public saveForm(): void {
    if(this.action === Action.create) {
      this._service.createEmployee(this.form.controls.value).subscribe(() => {
        this.cancelForm();
      });
    } else {
      this._service.updateEmployee(this.form.controls.value, this.formData.id).subscribe(() => {
        this.cancelForm();
      });
    }
  }

  public cancelForm(): void {
    this.cancel.emit(false);
    this.action = Action.create;
  }
}
