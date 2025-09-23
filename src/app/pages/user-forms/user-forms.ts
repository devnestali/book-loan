import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { translateMessages } from '../../utils/translateMessages';

@Component({
  selector: 'app-user-forms',
  standalone: false,
  templateUrl: './user-forms.html',
  styleUrl: './user-forms.css'
})
export class UserForms implements OnInit {
  user?: User
  userForms: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
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
    const passwordValidators = [Validators.minLength(8), Validators.maxLength(100)]

    if(!this.user) {
      passwordValidators.unshift(Validators.required)
    }

    this.userForms = this.formBuilder.group({
      id: [0, [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.maxLength(250), Validators.email]],
      password: ['', passwordValidators],
      isAdmin: [false],
      ativo: [true]
    })
  }

  includeUser() {
   if (this.userForms.valid) {
    this.userService.includeUser(this.userForms.value).subscribe(
      {
        next: (response: any) => {
          const translatedSuccessMessage = translateMessages(response.message)
          this.toastr.success(translatedSuccessMessage)
          this.userForms.reset()
        }
      }
    )
   }
  }

  changeUser() {
    if(this.userForms.valid) {
      this.userService.changeUser(this.userForms.value).subscribe(
        {
          next: (response: any) => {
            const translatedSuccessMessage = translateMessages(response.message)
            this.toastr.success(translatedSuccessMessage)
          }
        }
      )
    }
  }
}
