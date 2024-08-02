import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'ngx-nexus-calendar',
  templateUrl: './nexus-calendar.component.html',
  styleUrls: ['./nexus-calendar.component.scss']
})
export class NexusCalendarComponent implements OnInit {
  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [
      { title: 'Meeting', date: '2024-08-01' },
      { title: 'Conference', date: '2024-08-02' }
    ],
    eventClick: this.handleEventClick.bind(this) // Bind the function to handle event clicks
  };

  constructor() {}

  ngOnInit(): void {
    // Initialize or fetch additional data if needed
  }

  handleEventClick(arg: any): void {
    // Handle the event click
    alert(`Event: ${arg.event.title}`);
  }
}
