import { subDays, subMonths } from 'date-fns';

import { FormatDistancePipe } from './format-distance.pipe';

describe('FormatDistancePipe', () => {
  it('should create an instance', () => {
    const pipe = new FormatDistancePipe();
    expect(pipe).toBeTruthy();
  });

  it('should calculate the distance between days', () => {
    const pipe = new FormatDistancePipe();
    const today = new Date();
    const yesterday = subDays(today, 1);

    expect(pipe.transform(yesterday, today)).toBe('1 day ago');
  });

  it('should calculate the distance between months', () => {
    const pipe = new FormatDistancePipe();
    const today = new Date();
    const aMonthAgo = subMonths(today, 1);

    expect(pipe.transform(aMonthAgo, today)).toBe('about 1 month ago');
  });
});
