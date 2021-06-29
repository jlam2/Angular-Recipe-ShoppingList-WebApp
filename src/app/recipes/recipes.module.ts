import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const appRoutes: Routes = [
    {path: '', component: RecipesComponent, canActivate: [AuthGuard], children:[
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipesEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipesEditComponent, resolve: [RecipesResolverService]}
    ] }
] 

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipesEditComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(appRoutes),
        ReactiveFormsModule
    ]
})
export class RecipesModule {}
