import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable , Subject } from 'rxjs';
import * as _ from 'lodash';

import { NgxSpinnerService } from "ngx-spinner";
import { IPokemon } from '../pokemon-list/pokemon/pokemon.interface';
import { IPokemonSpecies, IPokemonEvolutionChain } from './pokemon-details-interface';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit , OnDestroy{
  id: number;
  loadingError$ = new Subject<boolean>();
  pokemonDetails: IPokemon;
  pokemonEvolution: IPokemonEvolutionChain;
  pokemonSpecimen: IPokemonSpecies;

  private subscriptionSubject = new Subject();
  constructor(private routes: ActivatedRoute,
    private pokemonService: PokemonListService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.routes.params.subscribe
    ((params: Params) => {
      this.id  = params['id'].toLowerCase();
      this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        .pipe(
          switchMap((details: IPokemon) => {
            this.pokemonDetails = details;
            return this.pokemonService.getPokemonDetails(_.get(details, 'species.url'));
          }),
          switchMap((specimen: IPokemonSpecies) => {
            this.pokemonSpecimen = specimen;
            return this.pokemonService.getPokemonDetails(_.get(specimen, 'evolution_chain.url'));
          }),
          takeUntil(this.subscriptionSubject)
        )
        .subscribe((result: IPokemonEvolutionChain) => {
          this.pokemonEvolution = result;
          this.SpinnerService.hide();
        },
        error => {
          this.loadingError$.next(true);
          this.SpinnerService.hide();
        });
    });
  }

  ngOnDestroy() {
    this.subscriptionSubject.next();
  }
}
