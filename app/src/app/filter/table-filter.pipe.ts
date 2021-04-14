import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
  transform(values: any, term: string): any {
    if (!term || (values.length < 1)) {
      return values;
    }

    return (values || [])
      .filter(
        item => (Object.keys(values[0]))
          .some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]))
      );
  }
}
