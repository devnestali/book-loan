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
    "id": 5,
    "livroNome": "El Programador Pragmatico",
    "livroAutor": "David Thomas & Andrew Hunt",
    "livroEditora": "Anaya",
    "livroAnoPublicacao": "2018-02-17T00:00:00",
    "livroEdicao": "1"
  },
  {
    "id": 4,
    "livroNome": "Learning React",
    "livroAutor": "Banks & Porchello",
    "livroEditora": "O'Reilly",
    "livroAnoPublicacao": "2022-09-14T00:00:00",
    "livroEdicao": "1"
  },
  {
    "id": 3,
    "livroNome": "Learning React",
    "livroAutor": "Banks & Porchello",
    "livroEditora": "O'Reilly",
    "livroAnoPublicacao": "2022-09-14T00:00:00",
    "livroEdicao": "1"
  },
  {
    "id": 2,
    "livroNome": "Codigo Limpio",
    "livroAutor": "Robert C. Martin",
    "livroEditora": "ARTER",
    "livroAnoPublicacao": "2001-08-07T00:00:00",
    "livroEdicao": "3"
  },
  {
    "id": 1,
    "livroNome": "Los sueños de lo que esta hecho la Materia",
    "livroAutor": "Stephen Hawking",
    "livroEditora": "Critica",
    "livroAnoPublicacao": "2022-07-12T00:00:00",
    "livroEdicao": "1"
  }
]

  constructor(private bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide()
  }
}
