import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";

import { Recipe } from "./recipe.model";
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipes.actions';
import { take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private store: Store<fromApp.AppState>, private action$: Actions){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       this.store.dispatch(new RecipeActions.FetchRecipes());
       return this.action$.pipe(
           ofType(RecipeActions.SET_RECIPES),
           take(1)
       )
    }
}