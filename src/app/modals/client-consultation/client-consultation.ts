import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-consultation',
  standalone: false,
  templateUrl: './client-consultation.html',
  styleUrl: './client-consultation.css'
})
export class ClientConsultation implements OnInit {
  clientConsultation = ''

  ngOnInit(): void {
    console.log(this.clientConsultation)
  }
}
