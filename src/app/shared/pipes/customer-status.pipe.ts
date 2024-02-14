import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerStatus'
})
export class CustomerStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
