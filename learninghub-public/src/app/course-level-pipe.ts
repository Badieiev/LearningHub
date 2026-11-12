import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseLevel',
  standalone: true
})
export class CourseLevelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return 'Not specified';
    }
    switch (value.toLowerCase()) {
      case 'beginner':
        return 'Beginner Level';

      case 'intermediate':
        return 'Intermediate Level';

      case 'advanced':
        return 'Advanced Level';

      default:
        return value;
    }
  }


}
