import { Component, OnInit } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { IPokemonList, IPokemonListResult } from './pokemon-list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  next: string = null;
  previous: string = null;
  pokemonList: IPokemonListResult[];
  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  private getPokemonList(url?: string) {
    this.pokemonListService.getPokemonList(url)
    .subscribe((list: IPokemonList) => {
      this.next = list.next;
      this.previous = list.previous;
      this.pokemonList = list.results;
    });
  }

  getNext() {
    this.getPokemonList(this.next);
  }

  getPrevious() {
    this.getPokemonList(this.previous);
  }
}
