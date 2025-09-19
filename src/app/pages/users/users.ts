import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Pagination } from '../../models/pagination';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  users: User[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 10

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.selectUsers()
  }

  selectUsers() {
    this.userService.selectUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if(response.result && response.pagination) {
          this.users = response.result
          this.pagination = response.pagination
        }
      },
    })
  }

  pageChanged(event: any) {
    if(this.pageNumber !== event.page) {
      this.pageNumber = event.page
      this.selectUsers()
    }
  }


  changeOrDeleteUser(user: User) {
    this.router.navigate(['users/put'], { state: { user }})
  }
}

