import { Component, Input } from '@angular/core';
import { Client } from '../../models/client';

@Component({
  selector: 'app-info-client',
  standalone: false,
  templateUrl: './info-client.html',
  styleUrl: './info-client.css'
})
export class InfoClient {
  @Input() client?: Client
  @Input() showTrash = false
  @Input() showAdd = false
}
