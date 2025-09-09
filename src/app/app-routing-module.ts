import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { ClientForms } from './pages/client-forms/client-forms';
import { Books } from './pages/books/books';
import { BookForms } from './pages/book-forms/book-forms';
import { Loan } from './pages/loan/loan';
import { LoginForms } from './pages/login/login';
import { Users } from './pages/users/users';
import { UserForms } from './pages/user-forms/user-forms';

const routes: Routes = [
  {
    path: 'login',
    component: LoginForms
  },
  {
    path: '',
    component: Home
  },
  {
    path: 'clients',
    component: Clients
  },
  {
    path: 'clients/create',
    component: ClientForms
  },
  {
    path: 'clients/put',
    component: ClientForms
  },
  {
    path: 'books',
    component: Books
  },
  {
    path: 'books/create',
    component: BookForms
  },
  {
    path: 'loan',
    component: Loan
  },
  {
    path: 'users',
    component: Users
  },
  {
    path: 'users/create',
    component: UserForms
  },
  {
    path: 'users/put',
    component: UserForms
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
