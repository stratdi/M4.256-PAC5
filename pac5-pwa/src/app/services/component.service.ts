import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  private imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  private spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/";

  constructor(private http: HttpClient) { }

  getPokemon(offset: number): Observable<Pokemon[]> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`).pipe(
      map(response => response.results.map((pokemon: any) => ({
        id: pokemon.url.split('/').slice(-2, -1)[0],
        imageUrl: this.imageUrl + pokemon.url.split('/').slice(-2, -1)[0] + '.png',
        spriteUrl: this.spriteUrl + pokemon.url.split('/').slice(-2, -1)[0] + '.gif',
        name: pokemon.name
      }))));
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map(response => response.results.map((pokemon: any) => ({
        id: pokemon.id,
        imageUrl: this.imageUrl + pokemon.id + '.png',
        spriteUrl: this.spriteUrl + pokemon.id + '.gif',
        name: pokemon.name
      }))));
  }

  getPokemonDetailsById(id: string): Observable<Pokemon> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      mergeMap(response => {
        const pokemon: Pokemon = {
          id: response.id.toString(),
          imageUrl: `${this.imageUrl}${response.id}.png`,
          spriteUrl: `${this.spriteUrl}${response.id}.gif`,
          name: response.name,
          description: 'Carregant Pokédex...',
          types: response.types.map((type: any) => type.type.name),
          height: response.height * 10,
          width: response.width * 10,
          stats: {
            hp: response.stats[0].base_stat,
            attack: response.stats[1].base_stat,
            defense: response.stats[2].base_stat,
            specAttack: response.stats[3].base_stat,
            specDefense: response.stats[4].base_stat,
            speed: response.stats[5].base_stat,
          }
        };

        return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${id}`).pipe(
          map(speciesResponse => {
            const pokedexEntry = speciesResponse.flavor_text_entries;
            const description = pokedexEntry.find((entry: any) => entry.language.name === 'es');
            if (description) {
              pokemon.description = description.flavor_text;
            }
            return pokemon;
          })
        );
      })
    );
  }

}
