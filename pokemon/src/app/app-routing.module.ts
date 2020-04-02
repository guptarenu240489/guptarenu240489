import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonDetailGuard } from './pokemon-details/pokemon-detail-guard.service';


const routes: Routes = [
  { path: 'home', component: PokemonListComponent },
  { path: 'details/:id', component: PokemonDetailsComponent, canActivate:[PokemonDetailGuard] },
  { path: 'list', component: PokemonListComponent },
  { path: 'add', component: PokemonFormComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
