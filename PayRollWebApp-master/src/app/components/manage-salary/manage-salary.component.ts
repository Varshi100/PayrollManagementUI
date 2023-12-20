import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalaryViewModel } from 'src/app/models/SalaryViewModel';
import { UserViewModel } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-manage-salary',
  templateUrl: './manage-salary.component.html',
  styleUrls: ['./manage-salary.component.css']
})
export class ManageSalaryComponent  implements OnInit {

  salary!: SalaryViewModel ;
  employees!:UserViewModel[];

  constructor(private router:Router,private adminService: AdminService) { }

 async ngOnInit(): Promise<void> {
  if (localStorage.length == 0) {
    this.router.navigate(['/login']);
  }
  this.GetAllEmployees();
  // this.adminService.GetSalary();
 }
 async GetAllEmployees(){
  const data = await (await this.adminService.GetEmployee()).toPromise();

  if (data) {

    this.employees = data;

    console.log(this.employees);

  } else {

    this.employees = [];

  }
 }
 async GenerateSalary(id:string){
  const data = await (await this.adminService.GenerateSalary(id)).toPromise();

  if (data) {

    this.salary = data;

    console.log(this.salary);

  } else {

    this.salary;

  }
 }
 async downloadPDF(salaryId: string) {
  const data = await (await this.adminService.GenerateSalary(salaryId)).toPromise();
  if (data) {
    const pdf = new jsPDF();
    // Add content to the PDF
    pdf.text(`Salary Report`, 10, 10);
    pdf.text(`Employee FirstName: ${data.firstName}`, 10, 30);
    pdf.text(`Employee LastName: ${data.lastName}`, 10, 40);
    pdf.text(`Employee UserId: ${data.userId}`, 10, 50);
    pdf.text(`Employee Email: ${data.email}`, 10, 60);
    pdf.text(`Employee PhoneNumber: ${data.phoneNumber}`, 10, 70);
    pdf.text(`BasicSalary: ${data.basicSalary}`, 10, 80);
    pdf.text(`HR Allowance: ${data.hrAllowance}`, 10, 90);
    pdf.text(`DA Allowance: ${data.daAllowance}`, 10, 100);
    pdf.text(`Travel Allowance: ${data.travelAllowance}`, 10, 110);
    pdf.text(`Medical Allowance: ${data.medicalAllowance}`, 10, 120);
    pdf.text(`Washing Allowance: ${data.washingAllowance}`, 10, 130);
    pdf.text(`Leave Deduction: ${data.leaveDeduction}`, 10, 140);
    pdf.text(`Total Allowance: ${data.totalAllowances}`, 10, 150);
    pdf.text(`Total Deduction: ${data.totalDeductions}`, 10, 160);
    pdf.text(`Gross Salary: ${data.grossSalary}`, 10, 170);
    pdf.text(`Net Salary: ${data.netSalary}`, 10, 180);
   
    // Add more information as needed

    // Save the PDF with a specific name
    pdf.save(`payslip_${salaryId}.pdf`);
  } else {
    console.log(`Failed to generate payslip for salary ID: ${salaryId}`);
  }
}

 async myFunction() {
  var x = document.getElementById("snackbar");
  if(x){
    x.className = "show";
    setTimeout(() => {
      if (x) {
        x.className = x.className.replace("show", "");
      }
    }, 3000);
  }
}
}
