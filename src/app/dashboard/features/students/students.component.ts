import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from './models/student';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Student>();
  suscriptionRef: Subscription | null;

  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'birthDate',
    'gender',
    'course',
  ];

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private notificationsService: NotificationsService
  ) {

    this.suscriptionRef = this.notificationsService.showMessage().subscribe((name) => {
      Swal.fire( name, '', 'success');
    })
  }

  ngOnInit(): void {
    this.studentService.getStudents() 
    .subscribe((students) => {
      this.dataSource.data = students;
    }, (error) => {
      alert(error);
    })

  }

  ngOnDestroy(): void {
    this.suscriptionRef?.unsubscribe();
  }

  removeData(student: Student) {
    this.studentService.deleteStudent(student.id);
    this.notificationsService.createMessage(`${student.name} ha sido eliminado(a)`);
  }

  openCreateStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.studentService.createStudent(formData);
        this.notificationsService.createMessage(`${formData.name} ha sido sido creado(a)`);
      }
    });
  }

  editData(student: Student): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        student
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        formData.id = student.id;
        this.studentService.editStudent(formData)
        this.notificationsService.createMessage(`${formData.name} ha sido modificado(a)`);
      }
    });
  }
}
