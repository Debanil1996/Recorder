import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    public http:HttpClient
  ) { }

  getValues():Observable<any>{
    return this.http.get(`${environment.serverUrl}/cake`);
  }
}
