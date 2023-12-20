import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAdmin } from 'src/app/models/add-admin.model';
import { UserViewModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.css']
})
export class AllAdminsComponent implements OnInit{

  admins!:UserViewModel[];

  constructor(private router: Router, private adminService: AdminService) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    
    const data = await (await this.adminService.GetAdmin()).toPromise();

    if (data) {

      this.admins = data;

      console.log(this.admins);

    } else {

      this.admins = [];

    }
    this.adminService.GetAdmin();

  }

  addAdmin() {
    this.router.navigate(['/admin-dashboard/add-admin']);
  }
  updateAdmin(id:string){
    localStorage.setItem('updateId',id);
    this.router.navigate(['/admin-dashboard/update-admin'])
  }
}
