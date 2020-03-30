import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetailsComponent } from '../pokemon-details.component';

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.scss']
})
export class PokemonStatisticsComponent implements OnInit {
  @Input () pokemonDetails;
  constructor() { }

  ngOnInit(): void {
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
