import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-event-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="wrap">
      <mat-card class="card">
        <h2>Event Schedule</h2>
        <p class="sub">Event ID: {{ eventId }}</p>

        <ul class="list">
          <li><b>10:00 AM</b> - Registration & Welcome</li>
          <li><b>11:00 AM</b> - Keynote Session</li>
          <li><b>01:00 PM</b> - Lunch Break</li>
          <li><b>02:00 PM</b> - Workshop / Talks</li>
          <li><b>04:00 PM</b> - Closing & Networking</li>
        </ul>

        <p class="note">
          (Mock schedule – can be expanded to speakers list / sessions later.)
        </p>
      </mat-card>
    </div>
  `,
  styles: [`
    .wrap { max-width: 900px; margin: 20px auto; padding: 14px; color: white; }
    .card { background: #1e1e1e; padding: 18px; border-radius: 12px; color: white; }
    .sub { opacity: 0.85; margin-top: 4px; }
    .list { margin-top: 14px; line-height: 1.9; }
    .note { margin-top: 12px; opacity: 0.75; }
  `]
})
export class EventScheduleComponent implements OnInit {
  eventId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ✅ works for child route under event/:id
    this.eventId = this.route.parent?.snapshot.paramMap.get('id') ?? null;
  }
}