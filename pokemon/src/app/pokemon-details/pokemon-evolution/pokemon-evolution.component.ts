import { Component, OnInit, Input } from '@angular/core';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';
import { IPokemon } from 'src/app/pokemon-list/pokemon/pokemon.interface';
import { IPokemonEvolutionChain } from 'src/app/pokemon-details/pokemon-details-interface'
@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  @Input() evolutionDetails: IPokemonEvolutionChain;
  @Input() profile: IPokemon;
  evolvedImage: string;
  constructor(private pokemonService: PokemonListService) { }

  ngOnInit(): void {
    this.getEvolvedPokemonImage();
  }

  private getEvolvedPokemonId(): number {
    const evolvedPokemon = this.evolutionDetails.chain.evolves_to[0].species.url.split('/');
    const length = evolvedPokemon.length;
    return +evolvedPokemon[length - 2];
  }
  private getEvolvedPokemonImage(): void {
    const id = this.getEvolvedPokemonId();
    this.pokemonService.getPokemonById(id)
      .subscribe((details: any) => {
        this.evolvedImage = details.sprites.front_default;
      })
  }
}
