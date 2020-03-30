import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetailsComponent } from '../pokemon-details.component';
import { PokemonProfileModel } from './pokemon-profile.model';
import { PokemonListService } from 'src/app/pokemon-list/pokemon-list.service';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.scss']
})
export class PokemonProfileComponent implements OnInit {
  @Input() pokemonDetails;
  public pokemonProfile: PokemonProfileModel
  eggGroup;
  abilities;
  profileKeys;
  catchRate;
  genderRate;
  hatchCounter;
  constructor(private pokemonService: PokemonListService) { }

  ngOnInit(): void {
    this.abilities = this.getAbilities(this.pokemonDetails.abilities);
    this.eggGroup = this.getEggGroup(this.pokemonDetails.id);
  }
  getEggGroup(id: number) {
    let eggGroup;
    this.pokemonService.getSpecies(id)
      .subscribe((specimen: any) => {
        eggGroup = specimen.egg_groups.reduce((prev, current) => {
          return prev.name + ',' + current.name;
        });
        this.catchRate = specimen.capture_rate;
        this.genderRate = specimen.gender_rate;
        this.hatchCounter = specimen.hatch_counter;
        this.getProfile(eggGroup);
      });
  }
  getProfile(eggGroup) {
    this.pokemonProfile = new PokemonProfileModel(
      this.pokemonDetails.height,
      this.pokemonDetails.weight,
      this.catchRate,
      this.genderRate,
      eggGroup,
      this.hatchCounter,
      this.abilities,
      '1 Sp At');
      this.profileKeys = Object.keys(this.pokemonProfile);
  }
  getAbilities(abilities) {
    const ability = abilities.reduce((prev, current) => {
      return prev.ability.name + ',' + current.ability.name
    });
    return ability;
  }
}
