import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { UserViewModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AdminDetailsComponent } from '../admin-details/admin-details.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
    loginForm !: FormGroup;
    login!: Login;
    errMess!:string;
    userId!: string;
    showPassword = false;
    constructor(private fb:FormBuilder,
      private router: Router,private loginService:LoginService,
      private userService:UserService ){
      this.createForm();
    }
    ngOnInit() : void{

      this.loginForm = this.fb.group({
        Email: ['', Validators.required],
        Password: ['', Validators.required],
      });

    }
    
    createForm(){
      this.loginForm = this.fb.group({
        Email : "",
        Password : ""
      });
    }
    async LoginUser(){
      this.login = this.loginForm.value;
      console.log(this.login);
      debugger
      (await this.loginService.sendLoginUser(this.login))
      .subscribe(
        async result => {console.log(result),
        localStorage.clear();
        localStorage.setItem('id',result.id),
        this.userId = result.id,
        localStorage.setItem('RoleName',result.roleName),{}
        if(localStorage.getItem("RoleName") == "employee"){
          this.router.navigate(['employee-dashboard/employee-details'])
        }
        else{
          this.router.navigate(['admin-dashboard/admin-details'])
        }
      } ,
        errMess => { alert('Invalid credentials. Please try again.');}
      )
      
      
      this.loginForm.reset();
    }
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = this.loginForm.get('Password');
      if (passwordInput) {
        const inputElement = document.getElementById('password-input') as HTMLInputElement;
        inputElement.type = this.showPassword ? 'text' : 'password';
      }
    }
}


