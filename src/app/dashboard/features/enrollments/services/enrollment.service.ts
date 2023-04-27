import { Injectable } from '@angular/core';
import enrollments, { Enrollment, formDataEnrollment } from '../models/enrollment';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  enrollmentsCount: number = 0;
  enrollments_mocks: Enrollment[] = enrollments;

  private enrollments$ = new BehaviorSubject<Enrollment[]>(
    []
  );

  constructor(){

  }

  getEnrollments(): Observable<Enrollment[]> {
    this.enrollmentsCount = this.enrollments_mocks.length;
    this.enrollments$.next(this.enrollments_mocks);
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
    this.enrollments$.next(this.enrollments_mocks.filter(c => c.courseId == id));
    return this.enrollments$.asObservable();
  }

  getEnrollmentsByStudentId(id: number): Observable<Enrollment[]> {
    this.enrollments$.next(this.enrollments_mocks.filter(c => c.studentId == id));
    return this.enrollments$.asObservable();
  }

}
