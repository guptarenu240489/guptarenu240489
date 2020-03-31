import { Component, OnInit, Input } from '@angular/core';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  @Input() evolutionDetails;
  constructor(private pokemonService: PokemonListService) { }

  ngOnInit(): void {
    console.log('[evolutionDetails]', this.evolutionDetails);
  }

}
