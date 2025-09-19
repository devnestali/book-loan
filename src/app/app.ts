import { Component, OnInit, signal } from '@angular/core';
import { UserToken } from './models/userToken';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('book-loan-frontend');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    const userLogged = localStorage.getItem('@bookLoan:user')
    if (!userLogged) {
      return
    }

    const userToken: UserToken = JSON.parse(userLogged)

    this.userService.setCurrentUser(userToken)
  }
}
