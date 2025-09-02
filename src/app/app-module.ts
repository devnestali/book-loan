import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './modules/shared-module';
import { Home } from './pages/home/home';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { BaseUi } from './components/base-ui/base-ui';
import { Clients } from './pages/clients/clients';
import { ClientForms } from './pages/client-forms/client-forms';
import { Books } from './pages/books/books';
import { BookForms } from './pages/book-forms/book-forms';
import { Loan } from './pages/loan/loan';
import { InfoBook } from './components/info-book/info-book';
import { ClientConsultation } from './modals/client-consultation/client-consultation';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Home,
    Navbar,
    Footer,
    BaseUi,
    Clients,
    ClientForms,
    Books,
    BookForms,
    Loan,
    InfoBook,
    ClientConsultation
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
