import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-forms',
  standalone: false,
  templateUrl: './user-forms.html',
  styleUrl: './user-forms.css'
})
export class UserForms implements OnInit {
  user?: User
  userForms: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private router: Router) {
    const currentNavigation = this.router.currentNavigation()
    if(currentNavigation?.extras.state) {
      this.user = currentNavigation.extras.state['user']
    }
  }

  ngOnInit(): void {
    this.initializeForm()
    if(this.user) {
      this.user.password = ''
      this.userForms.setValue(this.user)
    }
  }

  initializeForm() {
    this.userForms = this.formBuilder.group({
      id: [0, [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      isAdmin: [false]
    })
  }
}
