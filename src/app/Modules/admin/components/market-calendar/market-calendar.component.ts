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

     // 2025 Holidays
  { date: new Date(2025, 0, 1), reason: "New Year's Day" },
  { date: new Date(2025, 0, 20), reason: 'Martin Luther King, Jr. Day' },
  { date: new Date(2025, 1, 17), reason: "Washington's Birthday" },
  { date: new Date(2025, 3, 18), reason: 'Good Friday' },
  { date: new Date(2025, 4, 26), reason: 'Memorial Day' },
  { date: new Date(2025, 5, 19), reason: 'Juneteenth National Independence Day' },
  { date: new Date(2025, 6, 4), reason: 'Independence Day' },
  { date: new Date(2025, 8, 1), reason: 'Labor Day' },
  { date: new Date(2025, 10, 27), reason: 'Thanksgiving Day' },
  { date: new Date(2025, 11, 25), reason: 'Christmas' },

  // 2026 Holidays
  { date: new Date(2026, 0, 1), reason: "New Year's Day" },
  { date: new Date(2026, 0, 19), reason: 'Martin Luther King, Jr. Day' },
  { date: new Date(2026, 1, 16), reason: "Washington's Birthday" },
  { date: new Date(2026, 3, 3), reason: 'Good Friday' },
  { date: new Date(2026, 4, 25), reason: 'Memorial Day' },
  { date: new Date(2026, 5, 19), reason: 'Juneteenth National Independence Day' },
  { date: new Date(2026, 6, 3), reason: 'Independence Day' }, // Close Early at 1 PM Eastern Time
  { date: new Date(2026, 8, 7), reason: 'Labor Day' },
  { date: new Date(2026, 10, 26), reason: 'Thanksgiving Day' },
  { date: new Date(2026, 11, 25), reason: 'Christmas' },

  { date: new Date(2027, 0, 1), reason: "New Year's Day" },
  { date: new Date(2027, 0, 18), reason: 'Martin Luther King, Jr. Day' },
  { date: new Date(2027, 1, 15), reason: "Washington's Birthday" },
  { date: new Date(2027, 2, 26), reason: 'Good Friday' },
  { date: new Date(2027, 4, 31), reason: 'Memorial Day' },
  { date: new Date(2027, 5, 18), reason: 'Juneteenth National Independence Day' },
  { date: new Date(2027, 6, 5), reason: 'Independence Day' }, // Close Early at 1 PM Eastern Time
  { date: new Date(2027, 8, 6), reason: 'Labor Day' },
  { date: new Date(2027, 10, 25), reason: 'Thanksgiving Day' },
  { date: new Date(2027, 11, 24), reason: 'Christmas Day' }
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
        // 2025 Holidays
        { date: new Date(2025, 0, 1), reason: "New Year's Day" },
        { date: new Date(2025, 2, 18), reason: 'Good Friday' }, // Adjusted dates for Good Friday and Easter Monday
        { date: new Date(2025, 3, 21), reason: 'Easter Monday' },
        { date: new Date(2025, 4, 5), reason: 'Early May Bank Holiday' },
        { date: new Date(2025, 4, 26), reason: 'Late May Bank Holiday' },
        { date: new Date(2025, 7, 25), reason: 'Summer Bank Holiday' },
        { date: new Date(2025, 11, 24), reason: 'Christmas Eve (Half Day)' },
        { date: new Date(2025, 11, 25), reason: 'Christmas' },
        { date: new Date(2025, 11, 26), reason: 'Boxing Day' },
    
        // 2026 Holidays (similarly adjust Good Friday and Easter Monday)
        { date: new Date(2026, 0, 1), reason: "New Year's Day" },
        { date: new Date(2026, 3, 3), reason: 'Good Friday' },
        { date: new Date(2026, 3, 6), reason: 'Easter Monday' },
        { date: new Date(2026, 4, 4), reason: 'Early May Bank Holiday' },
        { date: new Date(2026, 4, 25), reason: 'Late May Bank Holiday' },
        { date: new Date(2026, 7, 31), reason: 'Summer Bank Holiday' },
        { date: new Date(2026, 11, 24), reason: 'Christmas Eve (Half Day)' },
        { date: new Date(2026, 11, 25), reason: 'Christmas' },
        { date: new Date(2026, 11, 26), reason: 'Boxing Day' },
        
         // 2027 Holidays
    { date: new Date(2027, 0, 1), reason: "New Year's Day" },
    { date: new Date(2027, 2, 26), reason: 'Good Friday' }, // Adjusted dates for Good Friday and Easter Monday
    { date: new Date(2027, 3, 29), reason: 'Easter Monday' },
    { date: new Date(2027, 4, 3), reason: 'Early May Bank Holiday' },
    { date: new Date(2027, 4, 31), reason: 'Late May Bank Holiday' },
    { date: new Date(2027, 7, 30), reason: 'Summer Bank Holiday' },
    { date: new Date(2027, 11, 27), reason: 'Christmas (Monday)' }, // Christmas on Monday in 2027

    // 2028 Holidays
    { date: new Date(2028, 0, 1), reason: "New Year's Day" },
    { date: new Date(2028, 3, 14), reason: 'Good Friday' }, // Adjusted dates for Good Friday and Easter Monday
    { date: new Date(2028, 4, 17), reason: 'Easter Monday' },
    { date: new Date(2028, 4, 1), reason: 'Early May Bank Holiday' },
    { date: new Date(2028, 4, 29), reason: 'Late May Bank Holiday' },
    { date: new Date(2028, 7, 28), reason: 'Summer Bank Holiday' },
    { date: new Date(2028, 11, 25), reason: 'Christmas Day' }, // Christmas on Monday in 2028
    { date: new Date(2028, 11, 26), reason: 'Boxing Day' },
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
