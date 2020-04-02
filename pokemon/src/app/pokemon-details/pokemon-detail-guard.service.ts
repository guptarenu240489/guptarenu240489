import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { catchError } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

@Injectable()
export class PokemonDetailGuard implements CanActivate {
    constructor(private router: ActivatedRoute, private urlService: UserService) {}
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :
         Observable<boolean> | boolean  {
            if(this.urlService.isAdmin && route.params.id !== ':id')  {
                return true
            } else {
                return false;
            }

    }
}