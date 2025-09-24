import { Component, EventEmitter } from '@angular/core';
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
  onClose: EventEmitter<any> = new EventEmitter<void>()

  clients: Client[] = [
  {
    "id": 7,
    "cliCPF": "11111111113",
    "cliNome": "Jorge",
    "cliEndereco": "Calle Exemplo",
    "cliCidade": "Madrid",
    "cliBairro": "Bela Vista",
    "cliNumero": "12",
    "cliTelefoneCelular": "643727630",
    "cliTelefoneFixo": "643732551"
  },
  {
    "id": 6,
    "cliCPF": "11111111112",
    "cliNome": "Jorge Saulo",
    "cliEndereco": "Calle Exemplo",
    "cliCidade": "Madrid",
    "cliBairro": "Bela Vista",
    "cliNumero": "12",
    "cliTelefoneCelular": "643702717",
    "cliTelefoneFixo": "643702717"
  },
  {
    "id": 5,
    "cliCPF": "11111111111",
    "cliNome": "Putin",
    "cliEndereco": "Calle Exemplo",
    "cliCidade": "Madrid",
    "cliBairro": "Bela Vista",
    "cliNumero": "12",
    "cliTelefoneCelular": "643732551",
    "cliTelefoneFixo": "643732551"
  }
]

  constructor(private bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide()
  }

  addClient(client: Client) {
    this.onClose.emit(client)

    this.closeModal()
  }
}
