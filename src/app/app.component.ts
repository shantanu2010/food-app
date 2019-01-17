import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;

  }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyA9fQGZOT9lqY9ZPGg6ZBkbcdDFoMPi1E4",
      authDomain: "recipe-book-shantanu.firebaseapp.com"
    });

  }

}
