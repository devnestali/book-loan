import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { UserToken } from '../models/userToken';
import { PaginatedResult } from '../models/pagination';
import { UserFilter } from '../models/userFilter';
import { addUserQueryValuesOnUrl } from '../utils/addUserQueryValuesOnUrl';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl: string = environment.apiUrl
  private currentUserSource = new BehaviorSubject<UserToken | null>(null)
  currentUser$ = this.currentUserSource.asObservable()
  paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>()

  STORAGE_KEY = '@bookLoan:user'

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

  selectUser(id?: number) {
    return this.httpClient.get<any>(this.baseUrl + `usuario/${id ? id : 0}`).pipe(
      map((response: User) => {
        return response
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

  changeUser(user: User) {
    if(!user.password || user.password.length == 0) {
      user.password = undefined
    }

    return this.httpClient.put<any>(this.baseUrl + 'usuario', user).pipe(
      map((response: any) => {
        return response
      })
    )
  }

  signIn(login: Login) {
    return this.httpClient.post<any>(this.baseUrl + 'usuario/login', login).pipe(
      map((response: UserToken) => {
        if(response) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(response))
          this.setCurrentUser(response)
        }
        return response
      })
    )
  }

  isAdmin() {
    const storedUser = localStorage.getItem(this.STORAGE_KEY)

    if(storedUser) {
      const user: UserToken = JSON.parse(storedUser)
      return user.isAdmin
    }

    return false
  }

  setCurrentUser(userToken: UserToken) {
    this.currentUserSource.next(userToken)
  }

  logOut() {
    this.currentUserSource.next(null)
    localStorage.removeItem(this.STORAGE_KEY)
  }

  filterUsers(userFilter: UserFilter) {
    const params = addUserQueryValuesOnUrl(userFilter)

    return this.httpClient.get<User[]>(this.baseUrl + 'usuario/filtrar', { observe: 'response', params }).pipe(
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
}
