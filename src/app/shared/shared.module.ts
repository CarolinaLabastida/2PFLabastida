import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagesPipe } from './pipes/control-error-messages.pipe';
import { FontSizeDirective } from './directives/font-size.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective
  ]
})
export class SharedModule { }
