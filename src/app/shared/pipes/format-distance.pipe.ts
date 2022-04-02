import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({ name: 'formatDistance' })
export class FormatDistancePipe implements PipeTransform {
  transform(date: Date, baseDate: Date): unknown {
    return formatDistance(date, baseDate, { addSuffix: true });
  }
}
