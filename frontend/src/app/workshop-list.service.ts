import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Workshop {
  id: number;
  title: String;
  description: String | null;
  location: String | null;
   //date: datetime | null;
  host_id: number;
  host: Observable<User> | null
}

export interface User {
  id: number;
  pid: number;
  onyen: String;
  first_name: String;
  last_name: String;
  email: String;
  pronouns: String;
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

  getHost(id: number): Observable<User>{
    /* Returns a obersvable list of workshops currently in the database.

    Args:
      None.
    
    Returns:
      Observable list of workshops.

    Raises:
      None.
    */
  return this.http.get<User>("/api/user/${id}");
}

}
