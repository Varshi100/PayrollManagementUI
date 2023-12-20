import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Allowance } from '../models/allowance.model';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  allowanceLoginForm!:FormGroup;
  allowance!:Allowance;
  errMessage!:string;
  constructor(private fb:FormBuilder,private adminService:AdminService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.length== 0){
      this.router.navigate(['/login']);
    }
    this.CreateForm();

    this.allowanceLoginForm = this.fb.group({
      ClassName: ['',[Validators.required]],
      BasicSalary: ['', Validators.required],
      HRAllowance: ['', Validators.required],
      DAAllowance: ['', Validators.required],
      TravelAllowance: ['', Validators.required],
      MedicalAllowance: ['', Validators.required],
      WashingAllowance: ['', Validators.required],
    });


  }

  CreateForm(){
    this.allowanceLoginForm = this.fb.group({
      ClassName:"",
      BasicSalary:"",
      HRAllowance:"",
      DAAllowance:"",
      TravelAllowance:"",
      MedicalAllowance:"",
      WashingAllowance:"",
    });
  }
  async AddAllowance(){
    this.allowance = this.allowanceLoginForm.value;
    console.log(this.allowance);
    debugger
    (await this.adminService.AddAllowanceUser(this.allowance))
    .subscribe(
      allowance => {this.allowance = allowance,console.log(allowance),this.router.navigate(['admin-dashboard/admin-details'])} ,
      errMess => { this.allowance = <any> null;this.errMessage = <any>errMess;}
    )
    this.allowanceLoginForm.reset();
  }

  goToManageEmployees() {
    this.router.navigate(['/admin-dashboard/all-employees']);
  }
}
