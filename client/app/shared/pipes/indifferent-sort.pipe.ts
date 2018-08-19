import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indifferentSort',
})
export class IndifferentSortPipe<T extends object> implements PipeTransform {
  transform(contents: T[], field?: string, order = 1): T[] {
    if (!Array.isArray(contents) || contents.length === 0) {
      return contents;
    }

    if (typeof field !== 'string') {
      field = this.setField(contents[0]);
    }

    return contents.sort((a, b) => this.sort(a, b, field, order));
  }

  private setField(content: T): string {
    return Object.keys(content).shift();
  }

  private sort(a: T, b: T, field: string, order: number): number {
    const value1 = this.toString(a[field]);
    const value2 = this.toString(b[field]);

    return value1 > value2 ? order : order * -1;
  }

  private toString(value: any): string {
    return this.hasValue(value) ? value.toString().toLowerCase() : '';
  }

  private hasValue(value: any): boolean {
    return value !== undefined && value !== null;
  }
}
