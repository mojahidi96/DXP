import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, filterProperty: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item[filterProperty].toLowerCase().includes(searchText);
    });
  }
}

@Pipe({
  name: 'removeRepeat'
})
export class RemoveRepeatPipe implements PipeTransform {

  transform(items: any[], filterProperty: string): any[] {
    if (!items) return [];
    if (!filterProperty) return items;
    return items.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.category[filterProperty] === arr.category[filterProperty])))
  }

}
