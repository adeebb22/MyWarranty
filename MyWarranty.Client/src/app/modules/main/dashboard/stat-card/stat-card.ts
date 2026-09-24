import { Component, Input } from '@angular/core';
import { StatCardData } from '../../../../models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() stat!: StatCardData;
}