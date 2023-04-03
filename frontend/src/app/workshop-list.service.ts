import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Workshop {
  id: number;
  title: String;
  description: String | null;
  location: String | null;
  // date: Date | null;
  // host: User | null;
}

@Injectable({
  providedIn: 'root'
})

export class WorkshopListService {


  constructor(protected http: HttpClient) { 
    
  }
  
  getWorkshop(): Observable<Workshop[]>{
    //returns list of workshops
    return this.http.get<Workshop[]>("/api/workshop");
  }

}
