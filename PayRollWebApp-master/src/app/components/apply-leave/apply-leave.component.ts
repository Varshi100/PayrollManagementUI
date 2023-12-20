import { Component, OnInit} from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ApplyLeave } from 'src/app/models/apply-leave.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit{

  applyLeaveForm!:FormGroup;
  applyLeave!:ApplyLeave;
  errMessage!:string;
  userId!:string | null;
  constructor(private fb:FormBuilder, private employeeService:EmployeeService,
    private router:Router ) { }

  ngOnInit(): void {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.userId = localStorage.getItem('id');
      this.createForm();
  }

  createForm(){
    this.applyLeaveForm = this.fb.group({
      UserId : "",
      LeaveType: "",
      LeaveStartDate: "",
      LeaveEndDate: "",
      Reason: ""
    });
  }
  async ApplyLeave(){
    this.applyLeave = this.applyLeaveForm.value;
    this.applyLeave.UserId = this.userId;
    console.log(this.applyLeave);
    debugger
    (await this.employeeService.ApplyLeave(this.applyLeave))
    .subscribe(
      applyLeave => {this.applyLeave = applyLeave,console.log(applyLeave),
        this.router.navigate(['/employee-dashboard/leave-status'])
      } ,
      errMess => { this.applyLeave = <any> null;this.errMessage = <any>errMess;}
    )
    this.applyLeaveForm.reset();
  }
}
