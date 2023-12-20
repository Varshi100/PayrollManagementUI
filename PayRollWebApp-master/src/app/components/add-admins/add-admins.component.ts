import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { AddAdmin } from 'src/app/models/add-admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit{

  addAdminForm!: FormGroup;
  addAdmin!: AddAdmin;
  errMessage!: string;
  
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.length== 0){
      this.router.navigate(['/login']);
    }
    this.createForm();

    this.addAdminForm = this.fb.group({
      FirstName: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z]{1,32}')],
      ],
      LastName: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z]{1,32}')],
      ],
      Email: ['', [Validators.required, Validators.email]],
      PhoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[789]\\d{9}$')],
      ],
      Address: ['', Validators.required,Validators.pattern('[A-Za-z]{1,32}')],
      Position: ['', Validators.required,Validators.pattern('[A-Za-z]{1,32}')],
      JoiningDate: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  createForm() {
    this.addAdminForm = this.fb.group({
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      Password: "",
      PhoneNumber: "",
      JoiningDate: "",
      Position: ""
    });
  }
  async AddAdmin() {
    this.addAdmin = this.addAdminForm.value;
    debugger
    console.log(this.addAdmin);
    (await this.adminService.AddAdmin(this.addAdmin))
      .subscribe(
        addAdmin => { this.addAdmin = addAdmin, console.log(addAdmin),this.router.navigate(['admin-dashboard/all-admins']) },
        errMessage => { this.addAdmin = <any>null; this.errMessage = <any>errMessage; }
      )
    this.addAdminForm.reset();
  }

  goToManageAdmins() {
    this.router.navigate(['/admin-dashboard/all-admins']);
  }

}
