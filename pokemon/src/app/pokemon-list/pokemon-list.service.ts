import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemonList } from './pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

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
}
