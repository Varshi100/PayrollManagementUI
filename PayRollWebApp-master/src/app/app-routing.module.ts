import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AddAdminsComponent } from './components/add-admins/add-admins.component';
import { AllAdminsComponent } from './components/all-admins/all-admins.component';
import { UpdateAdminComponent } from './components/update-admin/update-admin.component';
import { UpdateLeaveComponent } from './components/update-leave/update-leave.component';
import { ManageSalaryComponent } from './components/manage-salary/manage-salary.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { CheckLeaveStatusComponent } from './components/check-leave-status/check-leave-status.component';
import { AllSalariesComponent } from './components/all-salaries/all-salaries.component';
import { AddClassComponent } from './add-class/add-class.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'admin-details',
        component: AdminDetailsComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },

      {
        path: 'all-employees',
        component: AllEmployeesComponent,
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
      },
      {
        path: 'update-employee',
        component: UpdateEmployeeComponent,
      },
      {
        path: 'all-admins',
        component: AllAdminsComponent,
      },
      {
        path: 'add-admin',
        component: AddAdminsComponent,
      },
      {
        path: 'update-admin',
        component: UpdateAdminComponent,
      },
      {
        path: 'update-leave',
        component: UpdateLeaveComponent,
      },
      {
        path: 'manage-salary',
        component: ManageSalaryComponent,
      },
      {
        path: 'add-class',
        component: AddClassComponent,
      },
    ]
    },
    {
      path: 'employee-dashboard',
      component: EmployeeDashboardComponent,
      data: { expectedRole: 'Employee' },
      children: [
        {
          path: 'change-password',
          component: ChangePasswordComponent,
        },
        {
          path: 'employee-details',
          component: EmployeeDetailsComponent,
        },
        {
          path: 'apply-leave',
          component: ApplyLeaveComponent,
        },
        {
          path: 'leave-status',
          component: CheckLeaveStatusComponent,
        },
        {
          path: 'all-salaries',
          component: AllSalariesComponent,
        },
      ],
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
