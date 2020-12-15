import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToIconCode',
})
export class CategoryToIconCodePipe implements PipeTransform {
  transform(category: string): string {
    switch (category) {
      case 'danger':
        return 'error';
      case 'view':
        return 'camera_alt';
      case 'toilet':
        return 'wc';
      case 'water':
        return 'local_drink';
      case 'rest':
        return 'nature_people';
      case 'other':
        return 'filter_tilt_shift';
      default:
        return null;
    }
  }
}
