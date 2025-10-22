import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Pagination } from '../../models/pagination';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFilter } from '../../models/userFilter';

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

  isCollapsed = true
  userForms: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectUsers()
    this.initializeForm()
  }

  initializeForm() {
    this.userForms = this.formBuilder.group({
      nome: ['', [Validators.maxLength(250)]],
      email: ['', [Validators.maxLength(250), Validators.email]],
      isAdmin: [false],
      isNotAdmin: [false],
      ativo: [false],
      inativo: [false]
    })
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

  filterUsers() {
    const userFilter: UserFilter = this.userForms.value

    userFilter.pageNumber = this.pageNumber
    userFilter.pageSize = this.pageSize

    this.userService.filterUsers(userFilter).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.users = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  undoFilter() {
    this.selectUsers()
    this.userForms.reset()
  }
}

