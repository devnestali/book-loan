import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientConsultation } from '../../modals/client-consultation/client-consultation';
import { Client } from '../../models/client';
import { BookConsultation } from '../../modals/book-consultation/book-consultation';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  openClientConsultationModal() {
    const initialValues = {
      clientConsultation: this.clientConsultation,
    }

    this.bsModalRef = this.modalService.show(ClientConsultation, { initialState: initialValues });

    this.bsModalRef?.content.onClose.subscribe((result: Client) => {
      this.client = result
    })
  }

  openBookConsultationModal() {
    const initialValues = {
      bookConsultation: this.bookConsultation
    }

    this.bsModalRef = this.modalService.show(BookConsultation, { initialState: initialValues })

    this.bsModalRef.content.onClose.subscribe((result: Book) => {
      const thereAreBooks = this.books.some((book) => book.id === result.id)

      if(thereAreBooks) {
        this.toastr.error("Ya has añadido este libro a la selección de libros para préstamo.")
      } else {
        this.books.push(result)
      }
    })
  }

  removeClient() {
    this.client = undefined
  }

  removeBook(bookId: number) {
    this.books = this.books.filter((book) => book.id !== bookId)
  }
}
