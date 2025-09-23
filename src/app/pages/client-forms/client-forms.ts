import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { translateMessages } from '../../utils/translateMessages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-forms',
  standalone: false,
  templateUrl: './client-forms.html',
  styleUrl: './client-forms.css'
})
export class ClientForms implements OnInit {
  client?: Client
  clientForms: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private toastr: ToastrService
  ) {
    const currentNavigation = this.router.currentNavigation()

    if(currentNavigation?.extras.state) {
      this.client = currentNavigation.extras.state['client']
    }
  }

  ngOnInit(): void {
    this.initializeForm()

    if(this.client) {
      this.clientForms.setValue(this.client)
    }
  }

  initializeForm() {
    this.clientForms = this.formBuilder.group(
      {
        id: [0, [Validators.required, Validators.minLength(0)]],
        cliCPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11),]],
        cliNome: ['', [Validators.required, Validators.maxLength(200)]],
        cliEndereco: ['', [Validators.required, Validators.maxLength(50)]],
        cliCidade: ['', [Validators.required, Validators.maxLength(50)]],
        cliBairro: ['', [Validators.required, Validators.maxLength(50)]],
        cliNumero: ['', [Validators.required, Validators.maxLength(50)]],
        cliTelefoneCelular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        cliTelefoneFixo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      }
    )
  }

  includeClient() {
    if(this.clientForms.valid) {
      this.clientService.includeClient(this.clientForms.value).subscribe({
        next: (response) => {
          const translatedSuccessResponse = translateMessages(response.message)
          this.toastr.success(translatedSuccessResponse)
        },
        error: (response) => {
          const translatedErrorResponse = translateMessages(response.error)
          this.toastr.error(translatedErrorResponse)
        }
      })
    }
  }

  changeClient() {
    if(this.clientForms.valid) {
      this.clientService.changeClient(this.clientForms.value).subscribe({
        next: (response) => {
          const translatedSuccessResponse = translateMessages(response.message)
          this.toastr.success(translatedSuccessResponse)
        },
        error: (response) => {
          const translatedErrorResponse = translateMessages(response.error)
          this.toastr.error(translatedErrorResponse)
        }
      })
    }
  }
}
