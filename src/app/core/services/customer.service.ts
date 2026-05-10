import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private API = 'http://localhost:8080/api/user/v2/activeUser';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.API);
  }
}