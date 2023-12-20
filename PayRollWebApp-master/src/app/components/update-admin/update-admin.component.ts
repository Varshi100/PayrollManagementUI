import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateEmployeeViewModel } from 'src/app/models/UpdateEmployeeViewModel';
import { UserViewModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  updateAdminForm!:FormGroup;
  id!:string |null;
  user !: UserViewModel;
  errMess!:string;
  updateAdmin!:UpdateEmployeeViewModel;
  constructor(private router:Router,private fb:FormBuilder,private employeeService:EmployeeService,
    private adminService:AdminService){

  }
  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.id = localStorage.getItem('updateId');
    console.log(this.id);
    if (this.id) {
      (await this.employeeService.GetAdminById(this.id)).subscribe(
        (result: UserViewModel) => {
          this.user = result;
          const backendDate = new Date(this.user.joiningDate);
          const isoDate = backendDate.toISOString().split('T')[0];
          console.log(this.user);
          this.updateAdminForm.patchValue({
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
    this.updateAdminForm = this.fb.group({
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
  async UpdateAdmin(){
    this.updateAdmin = this.updateAdminForm.value;
    this.updateAdmin.Id = this.id;
    debugger
    console.log(this.updateAdmin);
    (await this.adminService.UpdateAdmin(this.updateAdmin))
      .subscribe(
        updateAdmin => { this.updateAdmin = updateAdmin, console.log(updateAdmin),this.router.navigate(['admin-dashboard/all-admins']) },
        errMessage => { this.updateAdmin = <any>null; this.errMess = <any>errMessage; }
      )
    this.updateAdminForm.reset();
  }
  GoBack(){
    this.router.navigate(['admin-dashboard/all-admins']);
  }

}
