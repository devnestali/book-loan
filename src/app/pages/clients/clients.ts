import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { Pagination } from '../../models/pagination';
import { TextFormatter } from '../../helpers/TextFormatter';

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

  constructor(
    private router: Router,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.selectClients()
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
}
