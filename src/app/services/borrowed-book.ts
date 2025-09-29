import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowedBook {
  baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) {}

  includeBorrowedBook(loanId: number) {
    return this.httpClient.get<any>(this.baseUrl + 'livroEmprestado/emprestimo/' + loanId).pipe(
      map((response) => {
        return response
      })
    )
  }
}
