import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.component.html',
  styleUrls: ['./component-detail.component.css']
})
export class ComponentDetailComponent {
  constructor(private service: ComponentService, private activatedRoute: ActivatedRoute) { }

  pokemon!: Pokemon;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service
      .getPokemonById(id ? id : '0')
      .subscribe((poke) => this.pokemon = poke);
  }

}
