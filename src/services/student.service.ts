import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = 'http://localhost:3000/api/students'; 
  sendNewStudent$ = new Subject<any>(); 
  sendNewStudentAsObs$ = this.sendNewStudent$.asObservable(); 

  sendUpdateStudent$ = new Subject<any>();
  sendUpdateStudentAsObs$ = this.sendUpdateStudent$.asObservable();

  isStudentFormEditMode$ :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isStudentFormEditModeAsObs$ = this.isStudentFormEditMode$.asObservable(); 

  constructor(private http: HttpClient) { }

  // Method to register a student
  registerStudent(studentData: any) {
    return this.http.post(`${this.baseUrl}/register`, studentData).pipe(
      tap((response: any) => {       
        if(response && response['success']) {
          this.sendNewStudent$.next(response['data']); 
        }
      }),
      catchError((error) => {      
        return throwError(error);
      })
    );
  }

  // Method to get all students
  getAllStudents() {
    return this.http.get(`${this.baseUrl}/getAllStudents`);
  }

  // Method to delete a student
  deleteStudent(studentId: any) {
    return this.http.delete(`${this.baseUrl}/deleteStudent/${studentId}`).pipe(
      tap(() => {
       
      }),
      catchError((error) => {
       
        return throwError(error);
      })
    );
  }

  // Method to update a student
  updateStudent(studentId: any, studentData: any) {
    return this.http.put(`${this.baseUrl}/updateStudent/${studentId}`, studentData).pipe(
      tap(() => {
        console.log('Student updated successfully');
      }),
      catchError((error) => {
        console.error('Error updating student:', error);
        return throwError(error);
      })
    );
  }

}
