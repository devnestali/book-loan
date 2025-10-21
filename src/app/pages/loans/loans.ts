import { Component, OnInit } from '@angular/core';
import { LoansGet } from '../../models/loansGet';
import { LoanService } from '../../services/loan-service';
import { Pagination } from '../../models/pagination';
import { Router } from '@angular/router';
import { TextFormatter } from '../../helpers/TextFormatter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanFilter } from '../../models/loanFilter';

@Component({
  selector: 'app-loans',
  standalone: false,
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit {
  loans: LoansGet[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 10

  isCollapsed = true
  loanForms: FormGroup = new FormGroup({})

  constructor(
    private loanService: LoanService,
    private router: Router,
    private FormBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.selectLoans()
    this.initializeForm()
  }

  initializeForm() {
    this.loanForms = this.FormBuilder.group({
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      nome: ['', [Validators.maxLength(250)]],
      dataEmprestimoInicio: [''],
      dataEmprestimoFim: [''],
      dataEntregaInicio: [''],
      dataEntregaFim: [''],
      entregue: [false],
      naoEntregue: [false],
    })
  }

  selectLoans() {
    this.loanService.selectLoans(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if(response.result && response.pagination) {
          this.loans = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber != event.page) {
      this.pageNumber = event.page
      this.selectLoans()
    }
  }

  changeLoan(loan: LoansGet) {
    this.router.navigate(['loan'], { state: { loan } })
  }

  dateFormatter(date: string) {
    return TextFormatter.formatNewDate(date)
  }

  cpfFormatter(cpf: string) {
    return TextFormatter.formatCPF(cpf)
  }

  filterLoans() {
    const loanFilter: LoanFilter = this.loanForms.value

    loanFilter.pageNumber = this.pageNumber
    loanFilter.pageSize = this.pageSize

    this.loanService.filterLoan(loanFilter).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.loans = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

}
