import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-student-details-table',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatTableModule],
  templateUrl: './student-details-table.component.html',
  styleUrl: './student-details-table.component.scss'
})
export class StudentDetailsTableComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName'];
  dataSource: any[] = []; // This will hold the student data

  constructor(
    private _studentService: StudentService,
    
  ) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this._studentService.getAllStudents().subscribe((students: any) => {
      console.log('Fetched students:', students.data);
      this.dataSource = students.data; // Assign the fetched students to the data source
    }, error => {
        console.error('Error fetching students:', error);
    }); 
  }

  deleteStudent(studentId: number) {
    // this._studentService.deleteStudent(studentId).subscribe({
    //   next: () => {
    //     this.getAllStudents(); // Refresh the student list after deletion
    //   },
    //   error: (error) => {
    //     console.error('Error deleting student:', error);
    //   }
    // });
  }



}
