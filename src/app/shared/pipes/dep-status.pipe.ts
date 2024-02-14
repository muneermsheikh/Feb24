import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'depStatus'
})
export class DepStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
