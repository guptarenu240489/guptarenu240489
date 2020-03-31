import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IPokemonList } from './pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  pokemonList = new Subject<any>();
  pokemons = [];
  constructor(private httpClient: HttpClient) { }

  getPokemonList(url?: string) : Observable<IPokemonList>{
    if(!url) {
      return this.httpClient.get<IPokemonList>('http://pokeapi.co/api/v2/pokemon/?limit=30&offset=0')
    } else {
      return this.httpClient.get<IPokemonList>(url);
    }
  }

  getPokemonDetails(url: string) {
    return this.httpClient.get(url);
  }

  getPokemonById(id: number) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
  getSpecies(id: number) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }
}
