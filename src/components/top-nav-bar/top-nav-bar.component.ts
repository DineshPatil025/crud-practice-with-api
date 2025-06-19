import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegFormComponent } from '../student-reg-form/student-reg-form.component';


@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.scss'
})
export class TopNavBarComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {    
  }


  onAddStudent() {
   const dialogRef = this.dialog.open(StudentRegFormComponent, {
      width: '500px',
    });
  }

}
