import { Component, Inject } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmDialogConfig } from '../../models/confirm-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES,CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogConfig,

  ) {}

   
}
