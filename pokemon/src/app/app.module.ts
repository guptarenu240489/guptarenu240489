import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon-list/pokemon/pokemon.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonProfileComponent } from './pokemon-details/pokemon-profile/pokemon-profile.component';
import { PokemonEvolutionComponent } from './pokemon-details/pokemon-evolution/pokemon-evolution.component';
import { PokemonStatisticsComponent } from './pokemon-details/pokemon-statistics/pokemon-statistics.component';
import { PokemonDamageComponent } from './pokemon-details/pokemon-damage/pokemon-damage.component';
import { PokemonSearchComponent } from './header/pokemon-search/pokemon-search.component';
import { PokemonDetailGuard } from './pokemon-details/pokemon-detail-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent,
    HomeComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonComponent,
    PokemonFormComponent,
    PokemonProfileComponent,
    PokemonEvolutionComponent,
    PokemonStatisticsComponent,
    PokemonDamageComponent,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [PokemonDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
