import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable,map } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { UserViewModel } from '../models/user.model';
import { ApplyLeave } from '../models/apply-leave.model';
import { AddSalary } from '../models/add-salary.model';
import { LeaveViewModel } from '../models/LeaveViewModel';
import { AllowanceViewModel } from '../models/AllowanceViewModel';
import { SalaryViewModel } from '../models/SalaryViewModel';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient,private processHTTPMsgService : ProcessHTTPMsgService) { }

  async ApplyLeave(applyLeave: ApplyLeave):Promise<Observable<ApplyLeave>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<ApplyLeave>(baseURL + 'EmployeeController/ApplyLeave',applyLeave, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetEmployeeById(id : string | null):Promise<Observable<UserViewModel>>{
    return this.http.get<UserViewModel>(baseURL + "EmployeeController/GetEmployeeById/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAdminById(id : string | null):Promise<Observable<UserViewModel>>{
    return this.http.get<UserViewModel>(baseURL + "AdminController/GetAdminById/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetLeaves(id :string | null):Promise<Observable<LeaveViewModel[]>>{
    return this.http.get<LeaveViewModel[]>(baseURL + "EmployeeController/GetAllLeavesById/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async GetSalaryDetails():Promise<Observable<AddSalary>>{
    return this.http.get<AddSalary>(baseURL + "")
    .pipe(map(users => users))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAllLeaves():Promise<Observable<ApplyLeave[]>>{
    return this.http.get<ApplyLeave[]>(baseURL + "")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GetAllAllowances():Promise<Observable<AllowanceViewModel[]>>{
    return this.http.get<AllowanceViewModel[]>(baseURL + "AdminController/GetAllAllowances")
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  async GenerateSalary(id : string | null):Promise<Observable<SalaryViewModel>>{
    return this.http.get<SalaryViewModel>(baseURL + "AdminController/GenerateSalary/"+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
