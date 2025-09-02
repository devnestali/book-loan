import { Component } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-loan',
  standalone: false,
  templateUrl: './loan.html',
  styleUrl: './loan.css'
})
export class Loan {
  books: Book[] = [
    {
      id: 1,
      livroAnoPublicacao: new Date(2025, 4, 20),
      livroAutor: 'Robert C. Martin',
      livroEdicao: '1',
      livroNome: 'Clean Code',
      livroEditora: 'ANAXIS'
    },
    {
      id: 2,
      livroAnoPublicacao: new Date(2025, 4, 20),
      livroAutor: 'Linus Torvalds',
      livroEdicao: '1',
      livroNome: 'Microservices Architecture',
      livroEditora: 'ANAXIS'
    },
  ];
}
