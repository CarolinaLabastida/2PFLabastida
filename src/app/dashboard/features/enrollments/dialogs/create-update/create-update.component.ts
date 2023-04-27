import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import courses, { Course } from '../../../courses/models/course';
import students, { Student } from '../../../students/models/student';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent {
  coursesList: Course[] = courses;
  studentsList: Student[] = students;
  
  courseIdControl = new FormControl('', [
    Validators.required
  ]);

  studentIdControl = new FormControl('', [
    Validators.required
  ]);


  enrollmentForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl
  })

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      console.log(data);
      const enrollmentData = data.enrollment;
      this.courseIdControl.setValue(enrollmentData.courseId);
      this.studentIdControl.setValue(enrollmentData.studentId);
    }
  }

  save(): void{
    if(this.enrollmentForm.valid){
      this.dialogRef.close(this.enrollmentForm.value)
    } else{
      this.enrollmentForm.markAllAsTouched();
    }
  }
}

