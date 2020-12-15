import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToJapanese',
})
export class CategoryToJapanesePipe implements PipeTransform {
  transform(category: string): string {
    switch (category) {
      case 'danger':
        return '危険箇所';
      case 'view':
        return '絶景ポイント';
      case 'toilet':
        return 'お手洗い';
      case 'water':
        return '水場';
      case 'rest':
        return '休憩ポイント';
      case 'other':
        return 'その他';
      default:
        return null;
    }
  }
}
