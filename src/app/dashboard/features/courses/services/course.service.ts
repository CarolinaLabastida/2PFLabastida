import { Injectable } from '@angular/core';
import courses, { Course, formDataCourse } from '../models/course';
import { BehaviorSubject, Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  coursesCount: number = 0;

  private courses$ = new BehaviorSubject<Course[]>(
    courses
  );

  constructor(){

  }

  getCourses(): Observable<Course[]> {
    this.coursesCount = courses.length;
    return this.courses$.asObservable();
  }

  getCourseById(id: number): Observable<Course | undefined>{
    return this.courses$.asObservable()
    .pipe(
      map((courses) => courses.find((c) => c.id == id))
    )
  }

  createCourse(newCourse: formDataCourse): Observable<Course[]>{
    this.courses$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (courses) => {
        this.coursesCount = this.coursesCount + 1;
        this.courses$.next([
          ...courses,
          {
            id: this.coursesCount,
            ...newCourse
          }
        ]);
      },
      complete: ()=> {},
      error: () => {
        return 'Ocurrio un error al registrar el curso';
      }
    });

    return this.courses$.asObservable();
  }

  editCourse(modifiedCourse: Course): Observable<Course[]>{
    this.courses$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (courses) => {
        const coursesResult = courses.map((c) => {
          if(c.id == modifiedCourse.id){
            return {
              ...c,
              ...modifiedCourse
            }
          }else{
            return c;
          }
        })

        this.courses$.next(coursesResult);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al modificar el curso';
      }
    })

    return this.courses$.asObservable();
  }

  deleteCourse(courseId: number): Observable<Course[]> {
    this.courses$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (courses) => {
        const coursesResult = courses.filter((s) => s.id != courseId);
        this.courses$.next(coursesResult);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrio un error al eliminar el curso';
      }
    })

    return this.courses$.asObservable();
  }


}
