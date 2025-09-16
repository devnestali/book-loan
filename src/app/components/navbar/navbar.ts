import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { UserToken } from '../../models/userToken';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  userToken: UserToken | null = null

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectUser()
  }

  selectUser() {
    this.userService.currentUser$.subscribe({
      next: (user) => {
        this.userToken = user
      }
    })
  }

  changeUser() {
    this.userService.selectUser().subscribe({
      next: (user: User) => {
        this.router.navigate(['users/put'], { state: { user } })
      }
    })
  }

  logOut() {
    this.userService.logOut()
    this.router.navigate(['/login'])
  }
}
