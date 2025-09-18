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
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { AuthorizationMessage } from './pages/authorization-message/authorization-message';
import { loginVerifyGuard } from './guards/login-verify-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginForms,
    canActivate: [loginVerifyGuard]
  },
  {
    path: '',
    component: Home,
    canActivate: [authGuard]
  },
  {
    path: 'clients',
    component: Clients,
    canActivate: [authGuard]
  },
  {
    path: 'clients/create',
    component: ClientForms,
    canActivate: [authGuard]
  },
  {
    path: 'clients/put',
    component: ClientForms,
    canActivate: [authGuard]
  },
  {
    path: 'books',
    component: Books,
    canActivate: [authGuard]
  },
  {
    path: 'books/create',
    component: BookForms,
    canActivate: [authGuard]
  },
  {
    path: 'books/put',
    component: BookForms,
    canActivate: [authGuard]
  },
  {
    path: 'loan',
    component: Loan,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: Users,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/create',
    component: UserForms,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'users/put',
    component: UserForms,
    canActivate: [authGuard]
  },
  {
    path: 'no-authorization',
    component: AuthorizationMessage,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
