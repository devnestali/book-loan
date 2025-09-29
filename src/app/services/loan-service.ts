import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Loans } from '../models/loan';
import { LoansGet } from '../models/loansGet';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  baseUrl: string = environment.apiUrl
  paginatedResult: PaginatedResult<LoansGet[]> = new PaginatedResult<LoansGet[]>

  constructor(private httpClient: HttpClient) {}

  includeLoan(loan: Loans) {
    return this.httpClient.post<any>(this.baseUrl + 'emprestimo', loan).pipe(
      map((response) => {
        return response
      })
    )
  }

  selectLoans(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.httpClient
      .get<LoansGet[]>(this.baseUrl + 'emprestimo', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }

          return this.paginatedResult;
        })
      );
  }
}
