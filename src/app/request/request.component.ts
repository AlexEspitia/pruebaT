import { Component, OnInit } from '@angular/core';
import { Action } from '../models/action.model';
import { Request } from '../models/request.model';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public data: Request [] = [];
  public enableFrom: boolean = false;
  public crud = Action;
  public dataForm: Request =  {
    code: '',
    description: '',
    summary: '',
    employee: {
      id:0,
      name: ''
    }
  };
  constructor(private _service: RequestService) { }

  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this._service.getRequest().subscribe((result: Request[]) => {
      this.data = [...result]
    });
  }

  public setForm(action: Action, employee: Request) {
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
      code: '',
      description: '',
      summary: '',
      employee: {
        id:0,
        name: ''
      }
    };
  }
}
