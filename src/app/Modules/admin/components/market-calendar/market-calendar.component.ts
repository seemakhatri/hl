import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-calendar',
  templateUrl: './market-calendar.component.html',
  styleUrls: ['./market-calendar.component.scss']
})
export class MarketCalendarComponent implements OnInit {
  currentMonth: Date = new Date();
  daysInMonth: (Date | null)[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // US Market Holidays
  usMarketOffDays = [
    { date: new Date(2024, 0, 1), reason: "New Year's Day" },
    { date: new Date(2024, 0, 15), reason: 'Martin Luther King, Jr. Day' },
    { date: new Date(2024, 1, 19), reason: "Washington's Birthday" },
    { date: new Date(2024, 2, 29), reason: 'Good Friday' },
    { date: new Date(2024, 4, 27), reason: 'Memorial Day' },
    { date: new Date(2024, 5, 19), reason: 'Juneteenth National Independence Day' },
    { date: new Date(2024, 6, 4), reason: 'Independence Day' },
    { date: new Date(2024, 8, 2), reason: 'Labor Day' },
    { date: new Date(2024, 10, 28), reason: 'Thanksgiving Day' },
    { date: new Date(2024, 11, 25), reason: 'Christmas' },
  ];

  // UK Market Holidays
  ukMarketOffDays = [
    { date: new Date(2024, 0, 1), reason: "New Year's Day" },
    { date: new Date(2024, 2, 29), reason: 'Good Friday' },
    { date: new Date(2024, 3, 1), reason: 'Easter' },
    { date: new Date(2024, 4, 6), reason: 'Bank Holiday' },
    { date: new Date(2024, 4, 27), reason: 'Bank Holiday' },
    { date: new Date(2024, 7, 26), reason: 'Bank Holiday' },
    { date: new Date(2024, 11, 24), reason: 'Christmas (Half Day)' },
    { date: new Date(2024, 11, 25), reason: 'Christmas' },
    { date: new Date(2024, 11, 26), reason: 'Boxing Day' },
    { date: new Date(2024, 11, 31), reason: "New Year's Eve (Half Day)" },
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    this.daysInMonth = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Add blank days for alignment before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      this.daysInMonth.push(null);
    }

    // Add all days of the month
    for (let day = new Date(firstDay); day <= lastDay; day.setDate(day.getDate() + 1)) {
      this.daysInMonth.push(new Date(day));
    }
  }

  isWeekend(day: Date | null): boolean {
    if (!day) return false;
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  }

  isMarketOffUS(day: Date | null): boolean {
    if (!day) return false;
    return this.usMarketOffDays.some(offDay =>
      this.isSameDay(offDay.date, day)
    );
  }

  isMarketOffUK(day: Date | null): boolean {
    if (!day) return false;
    return this.ukMarketOffDays.some(offDay =>
      this.isSameDay(offDay.date, day)
    );
  }

  isMarketOffBoth(day: Date | null): boolean {
    if (!day) return false;
    return this.usMarketOffDays.some(usOffDay =>
      this.ukMarketOffDays.some(ukOffDay =>
        this.isSameDay(usOffDay.date, day) && this.isSameDay(ukOffDay.date, day)
      )
    );
  }

  getHolidayReason(day: Date | null): string {
    if (!day) return '';
    const usHoliday = this.usMarketOffDays.find(offDay =>
      this.isSameDay(offDay.date, day)
    );
    const ukHoliday = this.ukMarketOffDays.find(offDay =>
      this.isSameDay(offDay.date, day)
    );
  
    if (usHoliday && ukHoliday) {
      return `${usHoliday.reason} (US & UK)`;
    } else if (usHoliday) {
      return `${usHoliday.reason} (US)`;
    } else if (ukHoliday) {
      return `${ukHoliday.reason} (UK)`;
    } else {
      return 'Market Closed';
    }
  }
  

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

}
