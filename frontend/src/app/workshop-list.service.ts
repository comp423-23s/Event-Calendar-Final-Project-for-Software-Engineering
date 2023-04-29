import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface User{
  id: number | null;
  pid: number
  onyen: String 
  first_name: String 
  last_name: String 
  email: String 
  pronouns: String
}

export interface Workshop {
  id: number;
  title: String;
  description: String;
  location: String;
  date: Date;
  host_id: number | null;
  host: User | null;
  attendees: User[] | null;
}

export interface WorkshopNoHost {
  title: String;
  description: String | null;
  location: String | null;
  date: Date | null;
}

@Injectable({
  providedIn: 'root'
})

export class WorkshopListService {


  constructor(protected http: HttpClient) { 
    
  }

  getWorkshops(): Observable<Workshop[]>{
      /* Returns a obersvable list of workshops currently in the database.

      Args:
        None.
      
      Returns:
        Observable list of workshops.

      Raises:
        None.
      */
    return this.http.get<Workshop[]>("/api/workshop");
  }

}
