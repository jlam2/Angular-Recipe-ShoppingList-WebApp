import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
        private http: HttpClient, 
        private recipesService: RecipeService, 
        private authService: AuthService
    ){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://angular-recipe-book-f05f7-default-rtdb.firebaseio.com/.json', recipes).subscribe(
            response => {console.log(response);}
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://angular-recipe-book-f05f7-default-rtdb.firebaseio.com/.json')
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients:[]}
                })
            }),
            tap(recipes => {this.recipesService.setRecipes(recipes)})
        )
    }

    
}