import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { ClientForms } from './pages/client-forms/client-forms';
import { Books } from './pages/books/books';
import { BookForms } from './pages/book-forms/book-forms';

const routes: Routes = [
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
    path: 'books',
    component: Books
  },
  {
    path: 'books/create',
    component: BookForms
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
