import { Component, OnInit, Input } from '@angular/core';
import { PokemonProfileModel } from './pokemon-profile.model';
import { IPokemon } from 'src/app/pokemon-list/pokemon/pokemon.interface';
import { IPokemonSpecies } from '../pokemon-details-interface';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.scss']
})
export class PokemonProfileComponent implements OnInit{
  @Input() profile:IPokemon;
  @Input() specimen: IPokemonSpecies;
  public pokemonProfile: PokemonProfileModel
  profileKeys: string[];
  constructor() { }

  ngOnInit(): void {
    this.getProfile();
  }
  private getEggGroups(eggGroups: Array<any>) : string{

    const eggGroup=[]
    eggGroups.forEach(element => {
      eggGroup.push(element.name)
    });
    return eggGroup.join(', ');
  }
  getProfile(): void {
    this.pokemonProfile = new PokemonProfileModel(
      this.profile.height,
      this.profile.weight,
      this.specimen.capture_rate,
      this.specimen.gender_rate,
      this.getEggGroups(this.specimen.egg_groups),
      this.specimen.hatch_counter,
      this.getAbilities(this.profile.abilities),
      '1 Sp At');
      this.profileKeys = Object.keys(this.pokemonProfile);
  }

  private getAbilities(abilities) : string{
    const abiltiesJoined=[]
    abilities.forEach(element => {
      abiltiesJoined.push(element.ability.name)
    });
    return abiltiesJoined.join(', ');
  }
}
