import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://localhost:44373/api/'

  constructor(private httpClient: HttpClient) {}

  includeUser(user: User) {
    return this.httpClient.post<any>(this.baseUrl + 'usuario/register', user).pipe(
      map((response) => {
        return response
      })
    )
  }
}
