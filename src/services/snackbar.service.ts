import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

show(message: string, type: string = 'info', action: string = 'Close',duration: number = 3000) {
  let panelClass = '';
  switch (type) {
    case 'warn':
      panelClass = 'snackbar-warn';
      break;
    case 'success':
      panelClass = 'snackbar-success';
      break;
    default:
      panelClass = 'snackbar-info';
  }
  this.snackBar.open(message, action, {
    panelClass: [panelClass],
    horizontalPosition: 'right',
    verticalPosition: 'bottom',
    duration: duration,
  });
}


}
