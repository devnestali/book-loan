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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoClient } from './components/info-client/info-client';
import { BookConsultation } from './modals/book-consultation/book-consultation';
import { LoginForms } from './pages/login/login';
import { Users } from './pages/users/users';
import { UserForms } from './pages/user-forms/user-forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { AuthorizationMessage } from './pages/authorization-message/authorization-message';
import { LoadingInterceptor } from './interceptors/loading-interceptor';

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
    ClientConsultation,
    InfoClient,
    BookConsultation,
    LoginForms,
    Users,
    UserForms,
    AuthorizationMessage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [App]
})
export class AppModule { }
