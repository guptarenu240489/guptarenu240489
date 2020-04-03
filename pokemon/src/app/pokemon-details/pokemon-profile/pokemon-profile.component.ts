import { Component, OnInit, Input } from '@angular/core';
import { PokemonProfileModel } from './pokemon-profile.model';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.scss']
})
export class PokemonProfileComponent implements OnInit{
  @Input() profile;
  public pokemonProfile: PokemonProfileModel
  eggGroup;
  abilities;
  profileKeys;
  catchRate;
  genderRate;
  hatchCounter;
  constructor() { }

  ngOnInit(): void {
    this.getProfile();
  }
  private getEggGroups(eggGroups: Array<any>) {
    return eggGroups.reduce((prev, current) => {
        return prev.name + ',' + current.name;
    });
  }
  getProfile() {
    this.pokemonProfile = new PokemonProfileModel(
      this.profile.details.height,
      this.profile.details.weight,
      this.profile.species.capture_rate,
      this.profile.species.gender_rate,
      this.getEggGroups(this.profile.species.egg_groups),
      this.profile.species.hatch_counter,
      this.getAbilities(this.profile.details.abilities),
      '1 Sp At');
      this.profileKeys = Object.keys(this.pokemonProfile);
  }

  private getAbilities(abilities) {
    const abiltiesJoined=[]
    abilities.forEach(element => {
      abiltiesJoined.push(element.ability.name)
    });
    return abiltiesJoined.join(',');
  }
}
