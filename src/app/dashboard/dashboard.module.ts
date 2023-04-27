import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentsModule } from './features/students/students.module';
import { CoursesModule } from './features/courses/courses.module';
import { EnrollmentsModule } from './features/enrollments/enrollments.module';


@NgModule({
  declarations: [
    ToolbarComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    RouterModule,
    StudentsModule,
    CoursesModule,
    EnrollmentsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
