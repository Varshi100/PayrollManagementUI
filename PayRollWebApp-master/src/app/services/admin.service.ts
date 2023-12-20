import { Injectable} from '@angular/core';
import { Allowance } from '../models/allowance.model';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError, Observable,map } from 'rxjs';
import { AddEmployee } from '../models/add-employee.model';
import { UserViewModel } from '../models/user.model';
import { AddAdmin } from '../models/add-admin.model';
import { ClassViewModel } from '../models/add-class.model';
import { AddSalary } from '../models/add-salary.model';
import { ApplyLeave } from '../models/apply-leave.model';
import { LeaveViewModel } from '../models/LeaveViewModel';
import { ApproveLeaveViewModel } from '../models/ApproveLeaveViewModel';
import { SalaryViewModel } from '../models/SalaryViewModel';
import { UpdateEmployeeViewModel } from '../models/UpdateEmployeeViewModel';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient, private processHTTPMsgService:ProcessHTTPMsgService) { }

  async AddAllowanceUser(allowance: Allowance):Promise<Observable<Allowance>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Allowance>(baseURL + 'AdminController/AddClass',allowance, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetAdminById(id : string | null):Promise<Observable<UserViewModel>>{
    return this.http.get<UserViewModel>(baseURL + "AdminController/GetAdminById/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  async AddEmployee(addEmployee: AddEmployee):Promise<Observable<AddEmployee>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<AddEmployee>(baseURL + 'AdminController/CreateEmployee',addEmployee, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async UpdateEmployee(updateEmployee: UpdateEmployeeViewModel):Promise<Observable<UpdateEmployeeViewModel>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<UpdateEmployeeViewModel>(baseURL + 'AdminController/UpdateEmployee',updateEmployee, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async UpdateAdmin(updateAdmin: UpdateEmployeeViewModel):Promise<Observable<UpdateEmployeeViewModel>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<UpdateEmployeeViewModel>(baseURL + 'AdminController/UpdateAdmin',updateAdmin, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async AddAdmin(addAdmin: AddAdmin):Promise<Observable<AddAdmin>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<AddAdmin>(baseURL + 'AdminController/CreateAdmin',addAdmin, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetEmployee():Promise<Observable<UserViewModel[]>>{
    return this.http.get<UserViewModel[]>(baseURL + "AdminController/GetAllEmployees")
    .pipe(map(users => users))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetAdmin():Promise<Observable<UserViewModel[]>>{
    return this.http.get<UserViewModel[]>(baseURL + "AdminController/GetAllAdmins")
    .pipe(map(users => users))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetClass():Promise<Observable<ClassViewModel>>{
    return this.http.get<ClassViewModel>(baseURL + "")
    .pipe(map(users => users))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetSalary():Promise<Observable<UserViewModel>>{
    return this.http.get<UserViewModel>(baseURL + "")
    .pipe(map(users => users))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAllPendingLeaves():Promise<Observable<LeaveViewModel[]>>{
    return this.http.get<LeaveViewModel[]>(baseURL + "AdminController/GetAllPendingLeaves")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAllApprovedLeaves():Promise<Observable<LeaveViewModel[]>>{
    return this.http.get<LeaveViewModel[]>(baseURL + "AdminController/GetAllApprovedLeaves")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAllRejectedLeaves():Promise<Observable<LeaveViewModel[]>>{
    return this.http.get<LeaveViewModel[]>(baseURL + "AdminController/GetAllRejectedLeaves")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async ApproveLeave(id: Number):Promise<Observable<LeaveViewModel>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<LeaveViewModel>(baseURL + 'AdminController/ApproveLeave/'+id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async RejectLeave(id: Number):Promise<Observable<LeaveViewModel>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<LeaveViewModel>(baseURL + 'AdminController/RejectLeave/'+id, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GenerateSalary(id : string | null):Promise<Observable<SalaryViewModel>>{
    return this.http.get<SalaryViewModel>(baseURL + "AdminController/GenerateSalary/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
