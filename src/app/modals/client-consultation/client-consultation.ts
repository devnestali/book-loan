import { Component, EventEmitter, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService } from '../../services/client-service';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-client-consultation',
  standalone: false,
  templateUrl: './client-consultation.html',
  styleUrl: './client-consultation.css'
})
export class ClientConsultation implements OnInit{
  clientConsultation = ''
  page = 1
  itemsPerPage = 1
  pagination: Pagination | undefined

  onClose: EventEmitter<any> = new EventEmitter<void>()

  clients: Client[] = []

  constructor(
    private bsModalRef: BsModalRef,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.consultClients()
  }

  closeModal() {
    this.bsModalRef.hide()
  }

  addClient(client: Client) {
    this.onClose.emit(client)

    this.closeModal()
  }

  consultClients() {
    this.clientService.searchClient(
      this.clientConsultation,
      this.page,
      this.itemsPerPage
    ).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.clients = response.result
          this.pagination = response.pagination
        }
      }
    })
  }

  pageChanged(event: any) {
    if(this.page !== event.page) {
      this.page = event.page
      this.consultClients()
    }
  }
}
