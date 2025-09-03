import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book-consultation',
  standalone: false,
  templateUrl: './book-consultation.html',
  styleUrl: './book-consultation.css'
})
export class BookConsultation {
  bookConsultation = ''
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
  ]

  constructor(private bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide()
  }
}
