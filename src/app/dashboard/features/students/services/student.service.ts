import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import students, { FormDataStudent, Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsCount:number = 0;
  private students$ = new BehaviorSubject<Student[]>(
    students
  );

  constructor() { }

  getStudents(): Observable<Student[]> {
    this.studentsCount = students.length;
    return this.students$.asObservable();
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this.students$.asObservable()
    .pipe(
      map((students) => students.find((s) => s.id == id))
    )
  }

  createStudent(newStudent: FormDataStudent): Observable<Student[]>{
    this.students$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (students) => {
        this.studentsCount = this.studentsCount + 1;
        this.students$.next([
          ...students,
          {
            id: this.studentsCount,
            ...newStudent
          }
        ]);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al registrar el alumno';
      }
    });

    return this.students$.asObservable();
  }

  editStudent(modifiedStudent: Student): Observable<Student[]> {
    this.students$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (students) => {
        const studentsResult = students.map((s) => {
          if(s.id == modifiedStudent.id){
            return {
              ...s,
              ...modifiedStudent
            }
          }else{
            return s;
          }
        })

        this.students$.next(studentsResult);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al editar el alumno';
      }
    });

    return this.students$.asObservable();
  }

  deleteStudent(studentId: number): Observable<Student[]> {
    this.students$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (students) => {
        const studentsResult = students.filter((s) => s.id != studentId)
        this.students$.next(studentsResult);
      },
       complete: () => {},
      error: () => {
        return 'Ocurrio un error al eliminar el alumno';
      }
    })

    return this.students$.asObservable();
  }
}
