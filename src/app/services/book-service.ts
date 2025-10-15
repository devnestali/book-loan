import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';
import { map } from 'rxjs';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl: string = environment.apiUrl
  paginatedResult: PaginatedResult<Book[]> = new PaginatedResult<Book[]>()

  constructor(private httpClient: HttpClient) {}

  selectBooks(page?: number, itemsPerPage?: number) {
    let params = new HttpParams()

    if(page && itemsPerPage) {
      params = params.append('pageNumber', page)
      params = params.append('pageSize', itemsPerPage)
    }

    return this.httpClient.get<Book[]>(this.baseUrl + 'livro', { observe: 'response', params })
      .pipe(
        map((response) => {
          if(response.body) {
            this.paginatedResult.result = response.body
          }

          const pagination = response.headers.get('Pagination')

          if(pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination)
          }

          return this.paginatedResult
        })
      )
  }

  includeBook(book: Book) {
    return this.httpClient.post<any>(this.baseUrl + 'livro', book).pipe(
      map((response) => {
        return response
      })
    )
  }

  selectBookById(id: number) {
    return this.httpClient.get<any>(this.baseUrl + 'livro/' + id).pipe(
      map((response: Book) => {
        return response
      })
    )
  }

  deleteBookById(id: number) {
    return this.httpClient.delete<any>(this.baseUrl + 'livro/' + id).pipe(
      map((response) => {
        return response
      })
    )
  }

  changeBook(book: Book) {
    return this.httpClient.put<any>(this.baseUrl + 'livro', book).pipe(
      map((response) => {
        return response
      })
    )
  }
}
