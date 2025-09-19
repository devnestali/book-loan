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
  clients: Client[] = []

  constructor(private bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide()
  }
}
