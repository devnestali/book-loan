import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../models/pagination';
import { Client } from '../models/client';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl: string = environment.apiUrl
  paginatedResult: PaginatedResult<Client[]> = new PaginatedResult<Client[]>()

  constructor(private httpClient: HttpClient) {}

  selectClients(page?: number, itemsPerPage?: number) {
    let params = new HttpParams()
    if(page && itemsPerPage) {
      params = params.append('pageNumber', page)
      params = params.append('pageSize', itemsPerPage)
    }

    return this.httpClient.get<Client[]>(this.baseUrl + 'cliente', { observe: 'response', params })
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

  includeClient(client: Client) {
    return this.httpClient.post<any>(this.baseUrl + 'cliente', client).pipe(
      map((response) => {
        return response
      })
    )
  }

  selectClientById(id: number) {
    return this.httpClient.get<any>(this.baseUrl + 'cliente/' + id).pipe(
      map((response) => {
        return response
      })
    )
  }

  changeClient(client: Client) {
    return this.httpClient.put<any>(this.baseUrl + 'cliente', client).pipe(
      map((response) => {
        return response
      })
    )
  }
}
