import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialogConfig } from '../models/confirm-dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(config: IConfirmDialogConfig): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: config
    });

    return dialogRef.afterClosed();
  }


}
