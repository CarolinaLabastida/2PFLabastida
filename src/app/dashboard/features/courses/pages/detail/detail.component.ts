import { Component, OnDestroy } from '@angular/core';
import { Course } from '../../models/course';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {
  course: Course | undefined;

  private subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ){
    this.courseService.getCourseById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(
      takeUntil(this.subject$)
    ).subscribe((course) => this.course = course);
  }

  ngOnDestroy(): void {
    this.subject$.next(true);
  }
}
