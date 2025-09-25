import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Loans } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) {}

  includeLoan(loan: Loans) {
    return this.httpClient.post<any>(this.baseUrl + 'emprestimo', loan).pipe(
      map((response) => {
        return response
      })
    )
  }
}
