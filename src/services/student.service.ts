import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = 'http://localhost:3000/api/students'; // Base URL for the student API
  

  constructor(private http: HttpClient) { }

  // Method to register a student
  registerStudent(studentData: any): void {
    this.http.post(`${this.baseUrl}/register`, studentData).subscribe({
      next: (response) => {
        console.log('Student registered successfully:', response);
      },
      error: (error) => {
        console.error('Error registering student:', error);
      }
    });
  }

  // Method to get all students
  getAllStudents() {
    return this.http.get(`${this.baseUrl}/getAllStudents`);
  }

}
