import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreditService } from '../service/service-credit.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  creditNumber:string;
  isSubmitDisabled:boolean = true;
  chackCreditSubscription: Subscription;
  responsCredit=[];
  constructor(private creditService: CreditService) { }

  ngOnInit() {
  }

  
  submit(){
    this.isSubmitDisabled = true;
    this.creditService.chackCredit({CreditNumber:this.creditNumber}).subscribe(data=> {
      if(data!= null && data!= undefined) {
        if(data[0]!= null && data[0]!= undefined) {
          this.responsCredit.push(data[0]);
        }
        else console.log(data["kodException"] +" "+ data["description"])
      }    
      this.isSubmitDisabled = false;
    });
  }

  changeCreditNumber(event:any){
    var luhn = require("luhn");
    var isValid = luhn.validate(this.creditNumber);
    this.isSubmitDisabled = isValid && this.creditNumber.length == 16 ? false : true;
  }

/*   ngOnDestroy() {
    this.chackCreditSubscription.unsubscribe();
  } */



}
