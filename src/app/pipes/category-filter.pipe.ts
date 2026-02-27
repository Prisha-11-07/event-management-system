import { Pipe, PipeTransform } from '@angular/core';
import { EventItem } from '../models/event.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true,
})
export class CategoryFilterPipe implements PipeTransform {
  transform(events: EventItem[] | null | undefined, category: string): EventItem[] {
    if (!events) return [];
    if (!category || category === 'All') return events;

    const c = category.toLowerCase();
    return events.filter((e) => (e.category || '').toLowerCase() === c);
  }
}