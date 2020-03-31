import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { mergeMap, switchMap, tap, takeUntil, withLatestFrom, map } from 'rxjs/operators';
import { Subject, Observable , combineLatest} from 'rxjs';
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  private subscriptionSubject = new Subject();
  id: number;
  pokemonProfile$: Observable<any>;
  pokemonSpecies$: Observable<any>;
  pokemonEvolution$: Observable<any>;
  pokemonProfileWithSpecies$: Observable<any>;
  pokemonProfileWithEvolution$: Observable<any>;
  profileAndSpecies;
  profileWithEvolution;
  constructor(private routes: ActivatedRoute, private pokemonService: PokemonListService) { }

  ngOnInit(): void {
    this.routes.params.subscribe
    ((params: Params) => {
      this.id  = +params['id'];
    //   this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
    //     .subscribe(data => {
    //       this.pokemonDetails = data;
    //     })
    })

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
        tap(value => console.log(value)),
        map(([details, species]) => {
        return {
          details,
          species
        }
      }));
    this.pokemonProfileWithSpecies$.subscribe(data => this.profileAndSpecies = data);

    this.pokemonProfileWithEvolution$ = combineLatest(this.pokemonProfile$, this.pokemonEvolution$)
      .pipe(
        tap(value => console.log('evolution', value)),
        map(([details, evolution]) => {
        return {
          details,
          evolution
        }
      }));
    this.pokemonProfileWithEvolution$.subscribe(data => this.profileWithEvolution = data);
      // this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      //   .pipe(
      //     switchMap((details: any) => {
      //       this.pokemonDetails = details;
      //       //
      //       //
      //       return this.pokemonService.getPokemonDetails(details.species.url);
      //     }),
      //     switchMap((specimen: any) => {
      //       return this.pokemonService.getPokemonDetails(specimen.evolution_chain.url);

      //     }),
      //     tap(specimen => {
      //       console.log(specimen);
      //     }),
      //     takeUntil(this.subscriptionSubject)
      //   )
      //   .subscribe(result => {
      //     console.log(result);
      //   });
  }

  ngOnDestroy() {
    // this.subscriptionSubject.next();
  }
}
