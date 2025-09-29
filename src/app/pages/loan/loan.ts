import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientConsultation } from '../../modals/client-consultation/client-consultation';
import { Client } from '../../models/client';
import { BookConsultation } from '../../modals/book-consultation/book-consultation';
import { ToastrService } from 'ngx-toastr';
import { Loans } from '../../models/loan';
import { LoanService } from '../../services/loan-service';
import { translateMessages } from '../../utils/translateMessages';
import { LoansGet } from '../../models/loansGet';
import { Router } from '@angular/router';
import { formateDate } from '../../utils/formateDate';
import { BorrowedBook } from '../../services/borrowed-book';

@Component({
  selector: 'app-loan',
  standalone: false,
  templateUrl: './loan.html',
  styleUrl: './loan.css'
})
export class Loan implements OnInit{
  books: Book[] = [];
  loan?: LoansGet

  client?: Client
  deliveryDate?: string


  bsModalRef?: BsModalRef;
  clientConsultation = '';
  bookConsultation = '';

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private loanService: LoanService,
    private borrowedBook: BorrowedBook,
    private router: Router
  ) {
    const currentNavigation = this.router.currentNavigation()

    if(currentNavigation?.extras.state) {
      this.loan = currentNavigation.extras.state['loan']
    }
  }

  ngOnInit(): void {
    if (this.loan) {
      this.client = this.loan.clienteDTO

      const formattedDate = formateDate(this.loan.dataEntrega)

      this.deliveryDate = formattedDate

      this.borrowedBook.includeBorrowedBook(this.loan.id).subscribe({
        next: (response: any) => {
          this.books = response.map((borrowedBook: any) => borrowedBook.livro)
        }
      })
    }
  }

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

  addLoan() {
    if(this.client) {
      const loan: Loans = {
      idCliente: this.client.id!,
      idsLivros: this.books.map((book) => book.id),
      dataEntrega: this.deliveryDate!,
    }

      this.loanService.includeLoan(loan).subscribe({
      next: (response) => {
        const translatedSuccessMessage = translateMessages(response.message)
        this.toastr.success(translatedSuccessMessage)

        this.books = []
        this.deliveryDate = undefined
        this.client = undefined
      }
    })
    }
  }
}
