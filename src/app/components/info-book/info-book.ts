import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-info-book',
  standalone: false,
  templateUrl: './info-book.html',
  styleUrl: './info-book.css'
})
export class InfoBook {
  @Input() book?: Book;
}
