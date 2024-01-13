import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  imports: [RouterModule, TitleCasePipe],
  standalone: true
})
export class GridComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() spriteUrl!: string;
}

