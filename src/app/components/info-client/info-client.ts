import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../models/client';
import { TextFormatter } from '../../helpers/TextFormatter';

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
  @Output() clickButton = new EventEmitter<void>()

  addOrRemove() {
    this.clickButton.emit()
  }

  cpfFormatter(cpf: string | undefined) {
    if (cpf) {
      return TextFormatter.formatCPF(cpf)
    }

    return undefined
  }

  landLineFormatter(phone: string | undefined) {
    if (phone) {
      return TextFormatter.formatLandline(phone)
    }

    return undefined
  }

  phoneNumberFormatter(phone: string | undefined) {
    if (phone) {
      return TextFormatter.formatPhoneNumber(phone)
    }

    return undefined
  }
}
