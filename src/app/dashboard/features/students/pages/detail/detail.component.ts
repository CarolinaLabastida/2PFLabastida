import { Component, OnDestroy } from '@angular/core';
import { Student } from '../../models/student';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {
  student: Student | undefined;

  private subject$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ){
    this.studentService.getStudentById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(takeUntil(this.subject$))
    .subscribe((student) => this.student = student);
  }

  ngOnDestroy(): void {
    this.subject$.next(true)
  }
}
