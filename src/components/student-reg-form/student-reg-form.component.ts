import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-reg-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,CommonModule, ReactiveFormsModule],
  templateUrl: './student-reg-form.component.html',
  styleUrl: './student-reg-form.component.scss'
})
export class StudentRegFormComponent {


  studentRegistrationForm! :FormGroup

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService
  ) { }

  ngOnInit(): void {
   this.createStudentRegistrationForm();
  }

  createStudentRegistrationForm() {
   this.studentRegistrationForm = this._fb.group({
     firstName: ['', Validators.required],
     lastName: ['', Validators.required],   
   });
  }

  onStudentFormSubmit() {
    if (this.studentRegistrationForm.valid) {
      this._studentService.registerStudent(this.studentRegistrationForm.value);
    }
  }
}
