import { Component, EventEmitter, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Pagination } from '../../models/pagination';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-consultation',
  standalone: false,
  templateUrl: './book-consultation.html',
  styleUrl: './book-consultation.css'
})
export class BookConsultation implements OnInit{
  bookConsultation = ''
  onClose: EventEmitter<any> = new EventEmitter<void>()

  page = 1
  itemsPerPage = 10
  pagination: Pagination | undefined

  books: Book[] = []

  constructor(
    private bsModalRef: BsModalRef,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.consultBooks()
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  addBook(book: Book) {
    this.onClose.emit(book)

    this.closeModal()
  }

  consultBooks() {
    this.bookService.searchForBook(this.bookConsultation, this.page, this.itemsPerPage).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.books = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  pageChanged(event: any) {
    if (this.page !== event.page) {
      this.page = event.page
      this.consultBooks()
    }
  }
}

