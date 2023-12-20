import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { UpdateEmployeeViewModel } from 'src/app/models/UpdateEmployeeViewModel';
import { UserViewModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  id !: string | null
  user : UserViewModel={}as any;
  errMess!:string
  updateEmployeeForm!:FormGroup;
  updateEmployee:UpdateEmployeeViewModel={}as any;
  constructor(private router:Router,private employeeService:EmployeeService,private adminService:AdminService,
    private fb:FormBuilder){
    
  }
  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.id = localStorage.getItem('updateId');
    console.log(this.id);
    if (this.id) {
      (await this.employeeService.GetEmployeeById(this.id)).subscribe(
        (result: UserViewModel) => {
          this.user = result;
          const backendDate = new Date(this.user.joiningDate);
          const isoDate = backendDate.toISOString().split('T')[0];
          console.log(this.user);
          this.updateEmployeeForm.patchValue({
            FirstName: this.user.firstName,
            LastName: this.user.lastName,
            Email: this.user.email,
            Address: this.user.address,
            Position:this.user.position,
            PhoneNumber: this.user.phoneNumber,
            JoiningDate: isoDate,
          });
        },
        (errMess: string) => {
          this.user;
          this.errMess = errMess;
        }
      );
    } else {
      this.id = null;
    }
    this.createForm();
  }
  createForm(){
    this.updateEmployeeForm = this.fb.group({
      Id:"",
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      PhoneNumber: "",
      JoiningDate: "",
      Position: ""
    })
  }
  async UpdateEmployee(){
    this.updateEmployee = this.updateEmployeeForm.value;
    this.updateEmployee.Id = this.id;
    debugger
    console.log(this.updateEmployee);
    (await this.adminService.UpdateEmployee(this.updateEmployee))
      .subscribe(
        updateEmployee => { this.updateEmployee = updateEmployee, console.log(updateEmployee),this.router.navigate(['admin-dashboard/all-employees']) },
        errMessage => { this.updateEmployee = <any>null; this.errMess = <any>errMessage; }
      )
    this.updateEmployeeForm.reset();
  }
  GoBack(){
    this.router.navigate(['admin-dashboard/all-employees']);
  }
}
