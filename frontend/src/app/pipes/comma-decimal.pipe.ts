import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaDecimal'
})
export class CommaDecimalPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }
}