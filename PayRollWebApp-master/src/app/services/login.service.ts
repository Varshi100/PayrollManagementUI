import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable,map } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Login } from '../models/login.model';
import { ChangePassword } from '../models/change-password.model';
import { LoginViewModel } from '../models/LoginViewModel';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,
    private processHTTPMsgService : ProcessHTTPMsgService) {

     }
     async sendLoginUser(login: Login): Promise<Observable<LoginViewModel>> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<LoginViewModel>(baseURL + 'LoginController/LoginUser',login, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
    async changePassword(changePassword: ChangePassword): Promise<Observable<ChangePassword>> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<ChangePassword>(baseURL + 'LoginController/ChangePassword',changePassword, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
