import { Pipe, PipeTransform } from '@angular/core';
import courses from 'src/app/dashboard/features/courses/models/course';
import students from 'src/app/dashboard/features/students/models/student';

@Pipe({
  name: 'descriptions'
})
export class DescriptionsPipe implements PipeTransform {

  transform(value: number, args: string): unknown {
    if(!value) return '';

    let defaultText = '';
    switch(args){
      case 'course':
        defaultText = `${courses.find(c => c.id == value)?.name}`;
        break;
      case 'student':
        defaultText = `${students.find(s => s.id == value)?.name}  ${students.find(s => s.id == value)?.lastName}`;
        break;
      default:
        defaultText = '';
    }   

    return defaultText;
  }

}
