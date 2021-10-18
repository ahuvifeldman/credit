import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: number[] = [];
  cardsDown: number[] = [];
  indexSelectPrevious: number = -1;
  numberStep: number = 0;
  numberPairs= 0;
  isWin:boolean = false;
  time: number = 0;
  timeWin : number;
  interval;
  star: number = null;
  starRating =[10,15,20];
  indexArry = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];

  constructor() { }

  ngOnInit() {

    this.setCards();
  }

  private restart(){
    this.setCards();
    this.numberStep = 0;
    this.time = 0;
    this.timeWin = null;
    this.isWin = false;
    this.star = null;
  }

  private setCards(){
    this.cards = [];
    this.cardsDown = [];
    let munbers: number[]= [1,1,2,2,3,3,4,4,5,5,6,6];
    let maxIndex = 12;
    for (let i = 0; i < 12; i++) {
      let indexRandon = Math.floor( Math.random() * maxIndex);
      this.cards.push(munbers[indexRandon]);
      munbers[indexRandon] = munbers[maxIndex-1];
      maxIndex--;
    }
    this.startTimer();
   
  }

  private clickCard(indexSelect:number){
    this.cardsDown[indexSelect]= this.cards[indexSelect];
    if(this.indexSelectPrevious >= 0){
      this.checkPair(this.indexSelectPrevious, indexSelect);
      this.numberStep++;
    }
    else {
      this.indexSelectPrevious = indexSelect;
    }
  }

  private checkPair(indexPrevious:number, index:number){
    if(this.cards[indexPrevious] == this.cards[index]){
      this.cardsDown[indexPrevious] = this.cards[indexPrevious];
      this.cardsDown[index] = this.cards[index];
      this.numberPairs++;
      this.checkWin();
    }
    else{
      setTimeout(() => {
        this.cardsDown[indexPrevious] = null;
        this.cardsDown[index] = null;
        },800);
    }
    this.indexSelectPrevious = -1;
  }
  
  private checkWin(){
   if(this.numberPairs == 6){
      this.isWin = true;
      for (let i = 0; i < this.starRating.length && this.star == null; i++) {
        if(this.numberStep<= this.starRating[i])
          this.star = i+1;
      }
      this.timeWin = this.time;
      this.pauseTimer();
      
   }
  }

  startTimer() {
    this.interval = setInterval(() => {
        this.time++;
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  

}

export class Car
{
    color:Colour;
}
export class Colour
{
    constructor(id:number, name:string) {
        this.id=id;
        this.name=name;
    }

    id:number;
    name:string;
}

class Employee{
  EmployeeName :string;
  EmployeePicture : string;
}
