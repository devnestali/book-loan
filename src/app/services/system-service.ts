import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) {}

  selectDashboardInfo() {
    return this.httpClient.get<any>(this.baseUrl + 'sistema/dashboard').pipe(
      map((response) => {
        return response
      })
    )
  }
}
