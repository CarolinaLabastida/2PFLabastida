import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './dashboard/features/students/students.component';
import { CoursesComponent } from './dashboard/features/courses/courses.component';
import { EnrollmentsComponent } from './dashboard/features/enrollments/enrollments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/features/home/home.component';
import { DetailComponent as StudentDetail} from './dashboard/features/students/pages/detail/detail.component';
import { DetailComponent as CourseDetail} from './dashboard/features/courses/pages/detail/detail.component';
import { DetailComponent as EnrrollmentDetail } from './dashboard/features/enrollments/pages/detail/detail.component';

const routes: Routes = [
  {
    path: 'sistema',
    component: DashboardComponent,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            component: HomeComponent
          }
        ]
      },
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: StudentsComponent
          },
          {
            path: ':id',
            component: StudentDetail
          }
        ]
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: CoursesComponent
          },
          {
            path: ':id',
            component: CourseDetail
          }
        ]
      },
      {
        path: 'inscripciones',
        children: [
          {
            path: '',
            component: EnrollmentsComponent
          },
          {
            path: ':id',
            component: EnrrollmentDetail
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sistema/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
