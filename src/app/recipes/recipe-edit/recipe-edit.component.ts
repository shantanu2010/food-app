import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id']!=null;
      this.initForm();
    });
  }

  onCancel(){

    this.router.navigate(["../"],{relativeTo : this.route});

  }

  onSubmit(){

    if(this.editMode)
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name":new FormControl(null,Validators.required),
        "amount":new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index:number){

    (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }

  getControls(){

    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
  private initForm(){

    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe["ingredients"]){
        for(let ingredient of recipe.ingredients)
          recipeIngredients.push(new FormGroup({
            "name":new FormControl(ingredient.name,Validators.required),
            "amount":new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
      }
    }

    this.recipeForm = new FormGroup({

      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients

    });
  }

}
