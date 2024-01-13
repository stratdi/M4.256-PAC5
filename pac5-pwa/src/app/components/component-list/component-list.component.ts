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
  loading: boolean = true;
  listView: boolean = true;

  ngOnInit(): void {
    this.service
      .getPokemon(this.offset)
      .subscribe((pokes) => { this.pokemonList = pokes; this.loading = false });
  }

  refresh(offset: number): void {
    this.loading = true;
    this.offset = offset;
    this.service
      .getPokemon(offset)
      .subscribe((pokes) => { this.pokemonList = pokes; this.loading = false });
  }
}
