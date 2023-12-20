import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApproveLeaveViewModel } from 'src/app/models/ApproveLeaveViewModel';
import { LeaveViewModel } from 'src/app/models/LeaveViewModel';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-leave',
  templateUrl: './update-leave.component.html',
  styleUrls: ['./update-leave.component.css']
})
export class UpdateLeaveComponent implements OnInit{
  pendingLeaves!:LeaveViewModel[];
  approvedLeaves!:LeaveViewModel[];
  rejectedLeaves!:LeaveViewModel[];
  approvedLeave!:LeaveViewModel;
  rejectedLeave!:LeaveViewModel;
  selectedStatus: string = 'pending';
  filteredLeaves!: LeaveViewModel[];
  constructor(private router:Router,
    private adminService:AdminService){

  }
  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.GetAllPendingLeaves();
    this.GetAllApprovedLeaves();
    this.GetAllRejectedLeaves();
    
  }
  async GetAllPendingLeaves(){
    const data = await (await this.adminService.GetAllPendingLeaves()).toPromise();

    if (data) {

      this.pendingLeaves = data;

      console.log(this.pendingLeaves);

    } else {

      this.pendingLeaves = [];

    }
  }
  async GetAllApprovedLeaves(){
    const data1 = await (await this.adminService.GetAllApprovedLeaves()).toPromise();

    if (data1) {

      this.approvedLeaves = data1;

      console.log(this.approvedLeaves);

    } else {

      this.approvedLeaves = [];

    }
  }
  async GetAllRejectedLeaves(){
    const data2 = await (await this.adminService.GetAllRejectedLeaves()).toPromise();

    if (data2) {

      this.rejectedLeaves = data2;

      console.log(this.rejectedLeaves);

    } else {

      this.approvedLeaves = [];

    }
  }
  async ApproveLeave(id : Number){
    const data2 = await (await this.adminService.ApproveLeave(id)).toPromise();

    if (data2) {

      this.approvedLeave = data2;
      location.reload();
      console.log(this.approvedLeave);


    } else {

      this.approvedLeave;

    }
  }
  async RejectLeave(id : Number){
    const data2 = await (await this.adminService.RejectLeave(id)).toPromise();

    if (data2) {

      this.rejectedLeave = data2;
      location.reload();
      console.log(this.rejectedLeave);

    } else {

      this.rejectedLeave;

    }
  }
  filterLeaves(status: string) {
    switch (status) {
      case 'pending':
        this.filteredLeaves = this.pendingLeaves;
        break;
      case 'approved':
        this.filteredLeaves = this.approvedLeaves;
        break;
      case 'rejected':
        this.filteredLeaves = this.rejectedLeaves;
        break;
      default:
        this.filteredLeaves = []; 
        break;
    }
    this.selectedStatus = status;
  }
  
}
