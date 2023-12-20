import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApplyLeave } from 'src/app/models/apply-leave.model';
import { LeaveViewModel } from 'src/app/models/LeaveViewModel';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-check-leave-status',
  templateUrl: './check-leave-status.component.html',
  styleUrls: ['./check-leave-status.component.css']
})
export class CheckLeaveStatusComponent {
  id!:string | null;
  leaves!: LeaveViewModel[];

  constructor(private router:Router,private employeeService: EmployeeService) { }

 async ngOnInit(): Promise<void> {
  if (localStorage.length == 0) {
    this.router.navigate(['/login']);
  }
  this.id = localStorage.getItem('id');
  const data = await (await this.employeeService.GetLeaves(this.id)).toPromise();
  console.log(data);
  if (data) {

    this.leaves = data;

    console.log(this.leaves);

  } else {

    this.leaves = [];

  }
 }
}
