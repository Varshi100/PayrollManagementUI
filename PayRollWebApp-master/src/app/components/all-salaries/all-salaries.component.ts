import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddSalary } from 'src/app/models/add-salary.model';
import { SalaryViewModel } from 'src/app/models/SalaryViewModel';
import { EmployeeService } from 'src/app/services/employee.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-all-salaries',
  templateUrl: './all-salaries.component.html',
  styleUrls: ['./all-salaries.component.css']
})
export class AllSalariesComponent {

  
  salarydetail:SalaryViewModel={}as any;
  id !: string | null;
  constructor(private router:Router, private employeeService: EmployeeService) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.length == 0) {
      this.router.navigate(['/login']);
    }
    this.id = localStorage.getItem('id');
    const data = await (await this.employeeService.GenerateSalary(this.id)).toPromise();

  if (data) {

    this.salarydetail = data;

    console.log(this.salarydetail);

  } else {

    this.salarydetail;

  }

  }
  printPayslip() {
    // Create a new instance of jsPDF
    const pdf = new jsPDF();

    // Add content to the PDF
    
    pdf.text('Salary Report', 20, 10);
    pdf.text(`Basic Salary: ${this.salarydetail.basicSalary}`, 20, 30);
    pdf.text(`HR Allowance: ${this.salarydetail.hrAllowance}`, 20, 40);
    pdf.text(`Basic Salary: ${this.salarydetail.daAllowance}`, 20, 50);
    pdf.text(`Travel Allowance: ${this.salarydetail.travelAllowance}`, 20, 60);
    pdf.text(`Medical Allowance: ${this.salarydetail.medicalAllowance}`, 20, 70);
    pdf.text(`Washing Allowance: ${this.salarydetail.washingAllowance}`, 20, 80);
    pdf.text(`Total Deductions: ${this.salarydetail.totalDeductions}`, 20, 90);
    pdf.text(`NetSalary: ${this.salarydetail.netSalary}`, 20, 100);
    // Save the PDF
    pdf.save('payslip.pdf');
  }
}
