import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './dashboard/features/students/students.component';
import { CoursesComponent } from './dashboard/features/courses/courses.component';
import { InscriptionsComponent } from './dashboard/features/inscriptions/inscriptions.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'sistema',
    component: DashboardComponent,
    children: [
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: StudentsComponent
          }
        ]
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: CoursesComponent
          }
        ]
      },
      {
        path: 'inscripciones',
        children: [
          {
            path: '',
            component: InscriptionsComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sistema'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
