import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegFormComponent } from '../student-reg-form/student-reg-form.component';
import { SignupComponent } from '../signup/signup.component';


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

  onSignUp() {

    const dialogConfig = {
      width: '500px',
      data: {
        title: 'Sign Up',
        message: 'Please fill in the details to sign up.',
        isSignup: true,
      },
    };
    
    const dialogRef = this.dialog.open(SignupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
