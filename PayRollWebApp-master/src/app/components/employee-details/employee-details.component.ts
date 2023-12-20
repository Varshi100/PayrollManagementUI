import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { UserViewModel } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
 
  id !: string | null
  user : UserViewModel={}as any;
  errMess!:string
  
  constructor(private router:Router,private employeeService : EmployeeService,
    private userService : UserService){

  }
  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.id = localStorage.getItem('id');

  console.log(this.id);

  if (this.id) {

    (await this.employeeService.GetEmployeeById(this.id)).subscribe(

      (result: UserViewModel) => {

        this.user = result;

        console.log(this.user);

      },

      (errMess: string) => {

        this.user;

        this.errMess = errMess;

      }

    );

  } else {

    this.id = null;

  }

  }
}
