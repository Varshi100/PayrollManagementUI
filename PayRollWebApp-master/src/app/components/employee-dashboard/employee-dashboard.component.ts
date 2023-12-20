import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyLeave } from 'src/app/models/apply-leave.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

  leaves: ApplyLeave[] = [];

  constructor(private router:Router,private employeeService: EmployeeService) { }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
 ngOnInit(): void {
  if (localStorage.length == 0) {
    this.router.navigate(['']);
  }

  this.employeeService.GetAllLeaves();
 }

}
