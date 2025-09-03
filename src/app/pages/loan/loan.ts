import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientConsultation } from '../../modals/client-consultation/client-consultation';
import { Client } from '../../models/client';
import { BookConsultation } from '../../modals/book-consultation/book-consultation';

@Component({
  selector: 'app-loan',
  standalone: false,
  templateUrl: './loan.html',
  styleUrl: './loan.css'
})
export class Loan {
  books: Book[] = [
    {
      Id: 1,
      livroAnoPublicacao: new Date(2025, 4, 20),
      livroAutor: 'Robert C. Martin',
      livroEdicao: '1',
      livroNome: 'Clean Code',
      livroEditora: 'ANAXIS'
    },
    {
      Id: 2,
      livroAnoPublicacao: new Date(2025, 4, 20),
      livroAutor: 'Linus Torvalds',
      livroEdicao: '1',
      livroNome: 'Microservices Architecture',
      livroEditora: 'ANAXIS'
    },
  ];

  client: Client = {
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


  bsModalRef?: BsModalRef;
  clientConsultation = '';
  bookConsultation = '';

  constructor(private modalService: BsModalService) {}

  openClientConsultationModal() {
    const initialValues = {
      clientConsultation: this.clientConsultation,
    }

    this.modalService.show(ClientConsultation, { initialState: initialValues });
  }

  openBookConsultationModal() {
    const initialValues = {
      bookConsultation: this.bookConsultation
    }

    this.modalService.show(BookConsultation, { initialState: initialValues })
  }
}
