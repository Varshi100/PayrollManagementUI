import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/change-password.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  changePassword!:ChangePassword;
  errMess!:string;
  id!:string | null;
  constructor(private router:Router, private loginService:LoginService,private fb:FormBuilder){
      this.createForm();
  }
  ngOnInit(): void {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.id = localStorage.getItem('id');
    this.changePasswordForm = this.fb.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
    });

  }
  createForm(){
    this.changePasswordForm = this.fb.group({
      Id : "",
      OldPassword : "",
      NewPassword : ""
    });
  }
  
  async ChangePassword(){
    
    this.changePassword = this.changePasswordForm.value;
    this.changePassword.Id = this.id;
    console.log(this.changePassword);
    (await this.loginService.changePassword(this.changePassword))
      .subscribe(
        changePassword => {this.changePassword = changePassword,console.log(changePassword),
        this.router.navigate(['/login'])} ,
        errMess => { this.changePassword = <any> null;this.errMess = <any>errMess;}
      )
  }
}
