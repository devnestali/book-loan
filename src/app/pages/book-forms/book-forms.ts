import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    }
  }

  initializeForm() {
    this.bookForms = this.formBuilder.group({
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
          console.log(response)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
