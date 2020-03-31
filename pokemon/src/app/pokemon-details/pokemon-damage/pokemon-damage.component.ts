import { Component, OnInit, Input } from '@angular/core';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-damage',
  templateUrl: './pokemon-damage.component.html',
  styleUrls: ['./pokemon-damage.component.scss']
})
export class PokemonDamageComponent implements OnInit {
  @Input() pokemonDetails: Observable<any>;
  pokemonMoves: Array<any>;
  constructor(private pokemonService: PokemonListService) { }
  moveList = [];
  ngOnInit(): void {
    this.pokemonDetails.subscribe(data => {
      this.pokemonMoves = data.moves
      this.getMoves();
    });
  }
  private getMoves() {
    this.pokemonMoves.map((move) => {
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
