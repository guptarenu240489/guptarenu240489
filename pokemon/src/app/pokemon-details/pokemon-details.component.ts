import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { Observable , combineLatest} from 'rxjs';

import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  id: number;
  pokemonProfile$: Observable<any>;
  pokemonSpecies$: Observable<any>;
  pokemonEvolution$: Observable<any>;
  pokemonProfileWithSpecies$: Observable<any>;
  pokemonProfileWithEvolution$: Observable<any>;
  profileAndSpecies;
  profileWithEvolution;
  constructor(private routes: ActivatedRoute,
    private pokemonService: PokemonListService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.routes.params.subscribe
    ((params: Params) => {
      this.id  = params['id'].toLowerCase();
      this.pokemonProfile$ = this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
      this.pokemonSpecies$ =  this.pokemonProfile$.pipe(
        switchMap((details: any) => {
          return this.pokemonService.getPokemonDetails(details.species.url);
        })
      );
      this.pokemonEvolution$ = this.pokemonSpecies$.pipe(
        switchMap((evolution: any) => {
          return this.pokemonService.getPokemonDetails(evolution.evolution_chain.url)
        })
      );

      this.pokemonProfileWithSpecies$ = combineLatest(this.pokemonProfile$, this.pokemonSpecies$)
        .pipe(
          map(([details, species]) => {
          return {
            details,
            species
          }
        }));
      this.pokemonProfileWithSpecies$.subscribe(data => this.profileAndSpecies = data);

      this.pokemonProfileWithEvolution$ = combineLatest(this.pokemonProfile$, this.pokemonEvolution$)
        .pipe(
          map(([details, evolution]) => {
          return {
            details,
            evolution
          }
        }));
      this.pokemonProfileWithEvolution$.subscribe(data => {
        this.profileWithEvolution = data;
        this.SpinnerService.hide();
      });
    });
  }
}
