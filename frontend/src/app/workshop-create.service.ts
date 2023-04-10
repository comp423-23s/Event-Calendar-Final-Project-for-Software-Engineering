import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



export interface Workshop {
  id: number;
  title: String;
  description: String | null;
  location: String | null;
  date: Date | null;
  //host: User | null;
}

interface RecievedWorkshop{
  id: number;
  title: String;
  description: String | null;
  location: String | null;
  date: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class WorkshopCreateService {

  constructor(protected http: HttpClient) { 
    
  }

  createWorkshop(newWorkShop: RecievedWorkshop){
    let dateAsDate = ""
    if(newWorkShop.date == null || newWorkShop.date ==  ""){
      return throwError(() => new Error("No date provided."));
    }
    else{
      let dateAsDate: Date = new Date(newWorkShop.date);
    }
    
    //get user and store
    //create a new workshop with a user and give it to the api call
    return this.http.put<Workshop>('/api/workshop', newWorkShop);
  }
  
}
