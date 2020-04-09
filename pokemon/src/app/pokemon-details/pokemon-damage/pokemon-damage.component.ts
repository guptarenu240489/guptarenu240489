import { Component, OnInit, Input } from '@angular/core';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';
import { Observable } from 'rxjs';
import { IPokemon, IPokemonMoves } from 'src/app/pokemon-list/pokemon/pokemon.interface';

@Component({
  selector: 'app-pokemon-damage',
  templateUrl: './pokemon-damage.component.html',
  styleUrls: ['./pokemon-damage.component.scss']
})
export class PokemonDamageComponent implements OnInit {
  @Input() pokemonDetails: IPokemon;
  pokemonMoves: IPokemonMoves[];
  constructor(private pokemonService: PokemonListService) { }
  moveList = [];
  ngOnInit(): void {
      this.pokemonMoves = this.pokemonDetails.moves;
      this.getMoves();
  }
  private getMoves(): void {
    this.pokemonMoves.map((move: IPokemonMoves) => {
      this.pokemonService.getPokemonDetails(move.move.url)
        .subscribe((moveData: any) => {
          this.moveList.push(moveData.damage_class.name);
        })
    });
  }

  removeDuplicates(moveList) {
    return moveList.filter((item, index) => moveList.indexOf(item) === index);
  };
}
