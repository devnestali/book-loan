import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client-consultation',
  standalone: false,
  templateUrl: './client-consultation.html',
  styleUrl: './client-consultation.css'
})
export class ClientConsultation {
  clientConsultation = ''
  clients: Client[] =
  [
    {
      Id: '1',
      CliCPF: 'Y237123G',
      CliNome: 'John Doe',
      CliEndereco: 'Main St',
      CliCidade: 'Anytown',
      CliBairro: 'Central',
      CliNumero: '123',
      CliTelefoneCelular: '(123) 456-7890',
      CliTelefoneFixo: '(098) 765-4321',
    },
    {
      Id: '1',
      CliCPF: 'Y237123G',
      CliNome: 'John Doe',
      CliEndereco: 'Main St',
      CliCidade: 'Anytown',
      CliBairro: 'Central',
      CliNumero: '123',
      CliTelefoneCelular: '(123) 456-7890',
      CliTelefoneFixo: '(098) 765-4321',
    }
  ]

  constructor(private bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide()
  }
}
