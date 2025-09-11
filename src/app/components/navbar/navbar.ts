import { Component } from '@angular/core';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private userService: UserService) {}

  logOut() {
    this.userService.logOut()
  }
}
