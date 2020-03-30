import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private pokemonService: PokemonListService) { }
  id: number;
  pokemonDetails;
  ngOnInit(): void {
    this.routes.params.subscribe
    ((params: Params) => {
      this.id  = +params['id'];
      this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        .subscribe(data => {
          this.pokemonDetails = data;
        })
    })
  }
  getBackgroundColor(type) {
    switch (type) {
      case 'grass':
        return 'green';
      case 'poison':
        return 'purple';
      case 'fire':
        return 'red';
      case 'flying':
        return 'orange';
      case 'normal':
        return 'pink';
      case 'water':
        return 'blue';
      default:
        return 'violet';
    }
  }

  getProgressbarWidth(width: number) {
    return `width: ${width}%;`
  }
}
