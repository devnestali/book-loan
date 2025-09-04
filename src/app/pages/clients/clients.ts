import { Component } from '@angular/core';
import { Client } from '../../models/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients {
  constructor(private router: Router) {}

  clients: Client[] = [
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
      CliNome: 'Johane Doe',
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
      CliNome: 'Johnny Doe',
      CliEndereco: 'Main St',
      CliCidade: 'Anytown',
      CliBairro: 'Central',
      CliNumero: '123',
      CliTelefoneCelular: '(123) 456-7890',
      CliTelefoneFixo: '(098) 765-4321',
    },
  ]

  changeOrDeleteClient(client: Client) {
    this.router.navigate(['clients/put'], { state: { client } })
  }
}
