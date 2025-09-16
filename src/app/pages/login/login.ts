import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { UserService } from '../../services/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginForms implements OnInit{
  login?: Login
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.initializeForm()
    if(this.login) {
      this.loginForm.setValue(this.login)
    }
  }

  signIn() {
    this.userService.signIn(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.success('Inicio de sesión exitoso.')
        this.router.navigate(['/'])
      },
      error: () => {
        this.toastr.error('Usuario o contraseña invalida.')
      },
    })
  }
}
