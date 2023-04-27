import { Injectable } from '@angular/core';
import enrollments, { Enrollment, formDataEnrollment } from '../models/enrollment';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  enrollmentsCount: number = 0;


  private enrollments$ = new BehaviorSubject<Enrollment[]>(
    enrollments
  );

  constructor(){

  }

  getEnrollments(): Observable<Enrollment[]> {
    this.enrollmentsCount = enrollments.length;
    return this.enrollments$.asObservable();
  }

  getEnrollmentById(id: number): Observable<Enrollment | undefined>{
    return this.enrollments$.asObservable()
    .pipe(
      map((enrollments) => enrollments.find((c) => c.id == id))
    )
  }

  createEnrollment(newEnrollment: formDataEnrollment): Observable<Enrollment[]>{
    this.enrollments$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (enrollments) => {
        this.enrollmentsCount = this.enrollmentsCount + 1;
        this.enrollments$.next([
          ...enrollments,
          {
            id: this.enrollmentsCount,
            date: new Date(),
            ...newEnrollment
          }
        ]);
      },
      complete: ()=> {},
      error: () => {
        return 'Ocurrio un error al registrar la inscripción';
      }
    });

    return this.enrollments$.asObservable();
  }

  editEnrollment(modifiedEnrollment: Enrollment): Observable<Enrollment[]>{
    this.enrollments$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (enrollments) => {
        const enrollmentsResult = enrollments.map((e) => {
          if(e.id == modifiedEnrollment.id){
            return {
              ...e,
              ...modifiedEnrollment
            }
          }else{
            return e;
          }
        })

        this.enrollments$.next(enrollmentsResult);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al modificar la inscripción';
      }
    })

    return this.enrollments$.asObservable();
  }

  deleteEnrollment(enrollmentId: number): Observable<Enrollment[]> {
    this.enrollments$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (enrollments) => {
        const enrollmentsResult = enrollments.filter((s) => s.id != enrollmentId);
        this.enrollments$.next(enrollmentsResult);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al eliminar la inscripción';
      }
    })

    return this.enrollments$.asObservable();
  }

  
  getEnrollmentsByCourseId(id: number): Observable<Enrollment[]> {
    return this.enrollments$.asObservable()
    .pipe(
      map((enrollments) => enrollments.filter(c => c.courseId == id))
    )
  }

  getEnrollmentsByStudentId(id: number): Observable<Enrollment[]> {
    return this.enrollments$.asObservable()
    .pipe(
      map((enrollments) => enrollments.filter(c => c.studentId == id))
    )
  }

}
