import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { Pagination } from '../../models/pagination';
import { TextFormatter } from '../../helpers/TextFormatter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clientFilter } from '../../models/clientFilter';

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients implements OnInit{
  clients: Client[] = []
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 10

  isCollapsed = true
  clientForms: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectClients()
    this.initializeForm()
  }

  initializeForm() {
    this.clientForms = this.formBuilder.group(
      {
        cpf: ['', [Validators.minLength(11), Validators.maxLength(11),]],
        nome: ['', [Validators.maxLength(200)]],
        cidade: ['', [Validators.maxLength(50)]],
        bairro: ['', [Validators.maxLength(50)]],
        telefoneCelular: ['', [Validators.minLength(11), Validators.maxLength(11)]],
        telefoneFixo: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      }
    )
}


  selectClients() {
    this.clientService.selectClients(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if(response.result && response.pagination) {
          this.clients = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  changeOrDeleteClient(client: Client) {
    this.router.navigate(['clients/put'], { state: { client } })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page
      this.selectClients()
    }
  }

  phoneNumberFormatter(phone: string) {
    return TextFormatter.formatPhoneNumber(phone)
  }

  cpfFormatter(cpf: string) {
    return TextFormatter.formatCPF(cpf)
  }

  clientFilter() {
    const clientFilter: clientFilter = this.clientForms.value

    clientFilter.pageNumber = this.pageNumber
    clientFilter.pageSize = this.pageSize

    this.clientService.filterClient(clientFilter).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.clients = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  undoFilter() {
    this.selectClients()
    this.clientForms.reset()
  }
}
