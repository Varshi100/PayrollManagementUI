import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAdmin } from 'src/app/models/add-admin.model';
import { UserViewModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  id !: string | null
  admin : UserViewModel={}as any; 
  errMess!: string

  constructor(private router: Router, private adminService: AdminService) {

  }
  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    else {
      this.id = localStorage.getItem('id');

      console.log(this.id);

      if (this.id) {

        (await this.adminService.GetAdminById(this.id)).subscribe(

          (result: UserViewModel) => {

            this.admin = result;

            console.log(this.admin);

          },

          (errMess: string) => {

            this.admin;

            this.errMess = errMess;

          }

        );

      } else {

        this.id = null;

      }
    }
  }
}
