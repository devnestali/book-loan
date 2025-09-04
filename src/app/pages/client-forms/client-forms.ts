import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-forms',
  standalone: false,
  templateUrl: './client-forms.html',
  styleUrl: './client-forms.css'
})
export class ClientForms implements OnInit {
  client?: Client
  clientForms: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
        Id: [0, [Validators.required, Validators.minLength(0)]],
        CliCPF: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11),]],
        CliNome: ['', [Validators.required, Validators.maxLength(200)]],
        CliEndereco: ['', [Validators.required, Validators.maxLength(50)]],
        CliCidade: ['', [Validators.required, Validators.maxLength(50)]],
        CliBairro: ['', [Validators.required, Validators.maxLength(50)]],
        CliNumero: ['', [Validators.required, Validators.maxLength(50)]],
        CliTelefoneCelular: ['', [Validators.required, Validators.maxLength(11)]],
        CliTelefoneFixo: ['', [Validators.required, Validators.maxLength(10)]],
      }
    )
  }
}
