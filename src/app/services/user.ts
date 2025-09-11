import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { UserToken } from '../models/userToken';
import { PaginatedResult } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl
  private currentUserSource = new BehaviorSubject<UserToken | null>(null)
  currentUser$ = this.currentUserSource.asObservable()
  paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>()

  constructor(private httpClient: HttpClient) {}

  selectUsers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams()

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page)
      params = params.append('pageSize', itemsPerPage)
    }

    return this.httpClient.get<User[]>(this.baseUrl + 'usuario', { observe: 'response', params }).pipe(
      map((response) => {
        if (response.body) {
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

  includeUser(user: User) {
    return this.httpClient.post<any>(this.baseUrl + 'usuario/register', user).pipe(
      map((response) => {
        return response
      })
    )
  }

  signIn(login: Login) {
    return this.httpClient.post<any>(this.baseUrl + 'usuario/login', login).pipe(
      map((response: any) => {
        if(response) {
          const token: UserToken = { token: response.token }
          localStorage.setItem('@bookLoan:user', JSON.stringify(token))
          this.setCurrentUser(response)
        }
        return response
      })
    )
  }

  setCurrentUser(userToken: UserToken) {
    this.currentUserSource.next(userToken)
  }

  logOut() {
    this.currentUserSource.next(null)
    localStorage.removeItem('@bookLoan:user')
  }
}
