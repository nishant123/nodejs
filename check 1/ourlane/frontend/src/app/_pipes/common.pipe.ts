import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterPipeUser'
})
export class FilterPipeUser implements PipeTransform {
  transform(values: any[], filter: string): any {
    if (!values || !values.length) { return []; }
    if (!filter) { return values; }
    filter = filter.toUpperCase();
    if (filter && Array.isArray(values)) {
      const keys = Object.keys(values[0]);

      return values.filter(v => {
        return (
          v.fullName
            .toString()
            .toUpperCase()
            .indexOf(filter) > -1
        );
      });
    }
  }
}

