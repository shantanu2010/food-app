import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
@Injectable()
export class DataStorageService{

  constructor(private http:Http,private recipeService:RecipeService,private authService:AuthService){

  }

  storeRecipes(){
    const token_recieved = this.authService.getToken();

    return this.http.put("https://recipe-book-shantanu.firebaseio.com/recipes.json?auth="+token_recieved,this.recipeService.getRecipes());
  }

  getRecipes(){

    const token_recieved = this.authService.getToken();


    this.http.get("https://recipe-book-shantanu.firebaseio.com/recipes.json?auth="+token_recieved)
             .pipe(map((response:Response)=>{

                const recipes:Recipe[] = response.json();
                for(let recipe of recipes){

                  if(!recipe["ingredients"]){
                    recipe["ingredients"] = [];
                  }
                }
                return recipes;
               })
             )
             .subscribe((recipes:Recipe[])=>{
                  this.recipeService.setRecipes(recipes);
                }
              );
  }

}
