import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  readonly APIUrl="https://localhost:5001/api"

  constructor(private http:HttpClient) { }

  chackCredit(val:any){
    return this.http.post(this.APIUrl+'/credit',val);
  }
}
