import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-info-book',
  standalone: false,
  templateUrl: './info-book.html',
  styleUrl: './info-book.css'
})
export class InfoBook {
  @Input() book?: Book;
  @Input() showAdd = false
  @Input() showTrash = false
  @Output() clickButton = new EventEmitter<void>()


  addOrRemoveBook() {
    this.clickButton.emit()
  }
}
