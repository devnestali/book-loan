import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientConsultation } from '../../modals/client-consultation/client-consultation';
import { Client } from '../../models/client';
import { BookConsultation } from '../../modals/book-consultation/book-consultation';
import { ClientService } from '../../services/client-service';

@Component({
  selector: 'app-loan',
  standalone: false,
  templateUrl: './loan.html',
  styleUrl: './loan.css'
})
export class Loan {
  books: Book[] = [];

  client?: Client


  bsModalRef?: BsModalRef;
  clientConsultation = '';
  bookConsultation = '';

  constructor(
    private modalService: BsModalService,
    private clientService: ClientService
  ) {}

  openClientConsultationModal() {
    const initialValues = {
      clientConsultation: this.clientConsultation,
    }

    this.bsModalRef = this.modalService.show(ClientConsultation, { initialState: initialValues });

    this.bsModalRef?.content.onClose.subscribe((result: any) => {
      const clientId = result.clientId

      this.clientService.selectClientById(clientId).subscribe({
        next: (response: Client) => {
          this.client = response
        }
      })
    })
  }

  openBookConsultationModal() {
    const initialValues = {
      bookConsultation: this.bookConsultation
    }

    this.modalService.show(BookConsultation, { initialState: initialValues })
  }

  removeClient() {
    this.client = undefined
  }
}
