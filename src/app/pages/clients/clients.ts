import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client-service';
import { Pagination } from '../../models/pagination';

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
    this.selectClient()
  }

  selectClient() {
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
}
