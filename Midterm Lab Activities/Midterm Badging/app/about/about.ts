import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  currentDate: Date = new Date();
}
