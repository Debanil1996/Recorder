import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(
    private storage:StorageService,
    private http:HttpClient
  ) { }
  postLogin(phone_no):Observable<any>{
    return this.http.post(`http://localhost:8080/cake/login`,phone_no);
  }
  public getToken(){
    return !!this.storage.get('token');
  }

}
