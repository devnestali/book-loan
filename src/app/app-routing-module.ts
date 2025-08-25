import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { ClientForms } from './pages/client-forms/client-forms';

const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'client',
    component: Clients
  },
  {
    path: 'client/create',
    component: ClientForms
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
