import { Component, OnInit } from '@angular/core';
import { LoansGet } from '../../models/loansGet';
import { LoanService } from '../../services/loan-service';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-loans',
  standalone: false,
  templateUrl: './loans.html',
  styleUrl: './loans.css'
})
export class Loans implements OnInit{
  loans: LoansGet[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 10

  constructor(private loanService: LoanService){}

  ngOnInit(): void {
    this.selectLoans()
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
    console.log(loan)
  }

}
