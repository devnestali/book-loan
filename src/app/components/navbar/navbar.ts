import { Component } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  logOut() {
    this.userService.logOut()
    this.router.navigate(['/login'])
  }
}
