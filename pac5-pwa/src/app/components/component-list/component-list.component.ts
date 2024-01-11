import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css'],
})
export class ComponentListComponent {
  constructor(private service: ComponentService) { }

  pokemonList: Pokemon[] = [];
  offset: number = 0;

  ngOnInit(): void {
    this.service
      .getPokemon(this.offset)
      .subscribe((pokes) => this.pokemonList = pokes);
  }

  refresh(offset: number): void {
    this.offset = offset;
    this.service
      .getPokemon(offset)
      .subscribe((pokes) => this.pokemonList = pokes);
  }
}
