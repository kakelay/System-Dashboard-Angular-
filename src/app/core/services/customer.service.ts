import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TranslationService } from "./translation.service";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly getCustomersAPI = `${this.apiBaseUrl}/api/user/v2/activeUser`;
  private readonly createUserAPI = `${this.apiBaseUrl}/api/user/v1/createUser`;

  constructor(
    private readonly http: HttpClient,
    private readonly translationService: TranslationService,
  ) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.getCustomersAPI);
  }

  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept-Language": this.translationService.getCurrentLanguage(),
    });

    return this.http.post(this.createUserAPI, userData, { headers });
  }
}
