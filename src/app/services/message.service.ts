import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  add(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }

  clear(message: string) {
    this.messages = this.messages.filter(m => m !== message);
  }
}
