import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  constructor(private router: Router) {}

  users: User[] =
  [
    {
      id: 0,
      nome: 'John Doe',
      email: 'johndoe@example.com',
      password: undefined,
      isAdmin: true,
      ativo: true
    },
    {
      id: 1,
      nome: 'Josh Doe',
      email: 'johndoe1@example.com',
      password: undefined,
      isAdmin: false,
      ativo: true
    },
    {
      id: 1,
      nome: 'Jack Doe',
      email: 'johndoe2@example.com',
      password: undefined,
      isAdmin: false,
      ativo: true
    },
  ]



  changeOrDeleteUser(user: User) {
    this.router.navigate(['users/put'], { state: { user }})
  }
}
