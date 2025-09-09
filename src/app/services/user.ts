import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl

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
      map((response) => {
        return response
      })
    )
  }
}
