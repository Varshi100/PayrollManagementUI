import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable,map, BehaviorSubject } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { UserViewModel } from '../models/user.model';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  id!: string; // Store the user information

  setUser(id: string) {
    this.id = id;
  }
}
