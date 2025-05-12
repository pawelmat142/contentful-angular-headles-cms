import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ContentService } from "./content.service";
import { ContentfulRespone } from "../model/contentful.interface";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private readonly contentService: ContentService,
  ) { }

    getDisabledDates$(): Observable<Date[]> {
        return this.contentService.getEntries$({ contentType: 'schedule' }).pipe(
            map(response => this.extractDates(response)),
            map(scheduledDates => this.addWeekendDaysForNext6Months(scheduledDates)),
        )
    }

    private extractDates(response: ContentfulRespone): Date[] {
        return response.items.map(item => {
            const schedule = item.fields['schedule'] as string
            return new Date(schedule)
        });
    }

    private addWeekendDaysForNext6Months(dates: Date[]): Date[] {
        const weekends: Date[] = [];
        const startDate = new Date()
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 6)

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay()
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                weekends.push(new Date(currentDate))
            }
            currentDate.setDate(currentDate.getDate() + 1)
        }

        dates.push(...weekends)
        return dates
    }
}