import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';
import { Pagination } from '../../models/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit{
  books: Book[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 10

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectBooks()
  }

  selectBooks() {
    this.bookService.selectBooks(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if(response.result && response.pagination) {
          this.books = response.result
          this.pagination = response.pagination
        }
      },
    })
  }

  pageChanged(event: any) {
    if(this.pageNumber !== event.page) {
      this.pageNumber = event.page
      this.selectBooks()
    }
  }

  changeBook(book: Book) {
    this.router.navigate(['/books/put'], { state: { book } })
  }

}
