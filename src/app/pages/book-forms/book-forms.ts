import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { translateMessages } from '../../utils/translateMessages';
import { formateDate } from '../../utils/formateDate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-forms',
  standalone: false,
  templateUrl: './book-forms.html',
  styleUrl: './book-forms.css'
})
export class BookForms implements OnInit{
  book?: Book
  bookForms: FormGroup = new FormGroup({})

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const currentNavigate = this.router.currentNavigation()
    if(currentNavigate?.extras.state) {
      this.book = currentNavigate.extras.state['book']
    }
  }

  ngOnInit(): void {
    this.initializeForm()
    if(this.book) {
      this.bookForms.setValue(this.book)
      const yearOfPublicationFormatted = formateDate(this.book.livroAnoPublicacao)

      this.bookForms.controls['livroAnoPublicacao'].setValue(yearOfPublicationFormatted)
    }
  }

  initializeForm() {
    this.bookForms = this.formBuilder.group({
      id: [0, Validators.required],
      livroNome: ['', [Validators.required, Validators.maxLength(50)]],
      livroAutor: ['', [Validators.required, Validators.maxLength(200)]],
      livroEditora: ['', [Validators.required, Validators.maxLength(50)]],
      livroAnoPublicacao: ['', [Validators.required]],
      livroEdicao: ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  includeBook() {
    if(this.bookForms.valid) {
      this.bookService.includeBook(this.bookForms.value).subscribe({
        next: (response) => {
          const translatedSuccessMessage = translateMessages(response.message)
          this.toastr.success(translatedSuccessMessage)
        },
      })
    }
  }

  deleteBook() {
    Swal.fire({
      icon: 'question',
      title: 'Eliminar libro',
      text: '¿Estas seguro que deseas eliminar el libro?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if(result.isConfirmed) {
        if(this.book?.id) {
          this.bookService.deleteBookById(this.book.id).subscribe({
            next: (response) => {
              const translatedSuccessResponse = translateMessages(response.message)
              this.toastr.success(translatedSuccessResponse)

              this.router.navigateByUrl('books')
          }
        })
      }
      }
    })
  }

  changeBook() {
    if(this.bookForms.valid) {
      this.bookService.changeBook(this.bookForms.value).subscribe({
        next: (response) => {
          const translatedSuccessMessage = translateMessages(response.message)
          this.toastr.success(translatedSuccessMessage)
        }
      })
    }
  }
}
