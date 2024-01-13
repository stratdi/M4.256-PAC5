import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [MatCardModule, MatButtonModule, RouterModule, TitleCasePipe],
  standalone: true
})
export class CardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() spriteUrl!: string;
}
