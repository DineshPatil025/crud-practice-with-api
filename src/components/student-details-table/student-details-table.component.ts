import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { signalUpdateFn } from '@angular/core/primitives/signals';
import { SHARED_MATERIAL_MODULES } from '../../shared/shared-material-modules';
import { MatDialog } from '@angular/material/dialog';
import { StudentRegFormComponent } from '../student-reg-form/student-reg-form.component';

@Component({
  selector: 'app-student-details-table',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatTableModule, MatIconModule, SHARED_MATERIAL_MODULES],
  templateUrl: './student-details-table.component.html',
  styleUrl: './student-details-table.component.scss'
})
export class StudentDetailsTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName','action'];
  dataSource: any[] = []; // This will hold the student data

  constructor(
    private _studentService: StudentService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
    this._studentService.sendNewStudentAsObs$.subscribe((newStudent: any) => {
      this.dataSource = [...this.dataSource, newStudent]
    });
    this._studentService.sendUpdateStudentAsObs$.subscribe((updatedStudent: any) => {
      const index = this.dataSource.findIndex(student => student._id === updatedStudent._id);
      if (index !== -1) {
        this.dataSource[index] = updatedStudent;
        this.dataSource = [...this.dataSource];

      }
    });
  }

  getAllStudents() {
    this._studentService.getAllStudents().subscribe((students: any) => {
      console.log('Fetched students:', students.data);
      this.dataSource = students.data; // Assign the fetched students to the data source
    }, error => {
        console.error('Error fetching students:', error);
    }); 
  }

  deleteStudent(studentId: any) {    
    this._studentService.deleteStudent(studentId).subscribe({
      next: (res:any) => {
        this.getAllStudents(); 
      },
      error: (error) => {
        console.error('Error deleting student:', error);
      }
    });
  }

  updateStudent(studentId: any, studentData: any) {
    this._studentService.isStudentFormEditMode$.next(true); 

   const dialogRef = this._matDialog.open(StudentRegFormComponent, {
      width: '400px',
      data: {
        student: studentData        
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this._studentService.isStudentFormEditMode$.next(false);
    });

  }
}




