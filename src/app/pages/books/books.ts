import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book-service';
import { Pagination } from '../../models/pagination';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookFilter } from '../../models/bookFilter';

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

  bookForms: FormGroup = new FormGroup({})

  isCollapsed = true

  constructor(
    private bookService: BookService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectBooks()
    this.initializeForm()
  }

  initializeForm() {
    this.bookForms = this.formBuilder.group({
      nome: ['', Validators.maxLength(50)],
      autor: ['', Validators.maxLength(200)],
      editora: ['', Validators.maxLength(50)],
      anoPublicacao: [''],
      edicao: ['', Validators.maxLength(50)]
    })
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

  filterBooks() {
    const bookFilter: BookFilter = this.bookForms.value

    bookFilter.pageNumber = this.pageNumber
    bookFilter.pageSize = this.pageSize

    this.bookService.filterBook(bookFilter).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.books = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  undoFilter() {
    this.selectBooks()
    this.bookForms.reset()
  }

}
