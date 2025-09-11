import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';
import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl
  private currentUserSource = new BehaviorSubject<UserToken | null>(null)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private httpClient: HttpClient) {}

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
  }
}
