import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddEmployee } from 'src/app/models/add-employee.model';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Allowance } from 'src/app/models/allowance.model';
import { AllowanceViewModel } from 'src/app/models/AllowanceViewModel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  addEmployee!: AddEmployee;
  errMessage!: string;
  allowances!:AllowanceViewModel[];
  
  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router,
    private employeeService:EmployeeService) { }

  async ngOnInit(): Promise<void> {
    if(localStorage.length== 0){
      this.router.navigate(['/login']);
    }
    this.createForm();
    const data = await (await this.employeeService.GetAllAllowances()).toPromise();

    if (data) {

      this.allowances = data;

      console.log(this.allowances);

    } else {

      this.allowances = [];

    };
    

    this.addEmployeeForm = this.fb.group({
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
      Address: ['', Validators.pattern('[A-Za-z]{1,32}')],
      Position: ['', Validators.pattern('[A-Za-z]{1,32}')],
      JoiningDate: ['', Validators.required],
      Password: ['', Validators.required],
      AllowanceId:['', Validators.required]
    });
  }

  createForm() {
    this.addEmployeeForm = this.fb.group({
      FirstName: "",
      LastName: "",
      Email: "",
      Address: "",
      Password: "",
      PhoneNumber: "",
      JoiningDate: "",
      Position: "",
      AllowanceId: "",
    });
  }
  async AddEmployee() {
    this.addEmployee = this.addEmployeeForm.value;
    debugger
    console.log(this.addEmployee);
    (await this.adminService.AddEmployee(this.addEmployee))
      .subscribe(
        addEmployee => { this.addEmployee = addEmployee, console.log(addEmployee),this.router.navigate(['admin-dashboard/all-employees']) },
        errMessage => { this.addEmployee = <any>null; this.errMessage = <any>errMessage; }
      )
    this.addEmployeeForm.reset();
  }

  goToManageEmployees() {
    this.router.navigate(['/admin-dashboard/all-employees']);
  }
}
