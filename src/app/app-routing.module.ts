import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  {path:'',redirectTo:'/employee',pathMatch:'full'},
  {
  path: 'employee',
  component: EmployeeComponent
  },
  {
    path: 'request',
    component: RequestComponent
  },
  {
    path:'**',
    redirectTo:'/employee'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
