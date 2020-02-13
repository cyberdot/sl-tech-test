import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'eliminationLabel'})
export class EliminationLabelPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}

