import { Component, OnInit, Input } from '@angular/core';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  @Input() evolutionDetails;
  evolvedImage: string;
  constructor(private pokemonService: PokemonListService) { }

  ngOnInit(): void {
    this.getEvolvedPokemonImage();
  }

  private getEvolvedPokemonId() {
    const evolvedPokemon = this.evolutionDetails.evolution.chain.evolves_to[0].species.url.split('/');
    const length = evolvedPokemon.length;
    return evolvedPokemon[length - 2];
  }
  private getEvolvedPokemonImage() {
    const id = this.getEvolvedPokemonId();
    this.pokemonService.getPokemonById(id)
      .subscribe((details: any) => {
        this.evolvedImage = details.sprites.front_default;
      })
  }
}
