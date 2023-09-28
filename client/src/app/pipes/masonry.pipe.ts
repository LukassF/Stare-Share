import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masonry',
})
export class MasonryPipe implements PipeTransform {
  transform(
    value: Post[] | null,
    numColumns: number,
    colNum: number
  ): Post[] | undefined {
    if (!value) return;
    if (value.length === 0) return value;
    if (
      numColumns < 1 ||
      colNum < 1 ||
      isNaN(numColumns) ||
      isNaN(colNum) ||
      colNum > numColumns
    ) {
      console.error('Invalid column configuration');
      return value;
    }
    return value.filter((val, index) => {
      return index % numColumns === colNum - 1;
    });
  }
}
