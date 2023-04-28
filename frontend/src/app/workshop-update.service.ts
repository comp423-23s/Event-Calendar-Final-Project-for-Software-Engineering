import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { User, Workshop, WorkshopNoHost } from './workshop-list.service';


@Injectable({
  providedIn: 'root'
})
export class WorkshopUpdateService {

  constructor(protected http: HttpClient) { }

  updateWorkshop(workshop_id: number, title: String, description: String, location: String, date: string): Observable<Workshop>{
    //Checks if date, title, or description is null, if not it converts it from a string to a Date object.
    if(date === null || date === ""){
      return throwError(() => new Error("No date provided."));
    }
    else{
      let dateAsDate: Date = new Date(date);
    
    if(description === null || description === ""){
      return throwError(() => new Error("No description provided."));
    }

    if(location === null || location === ""){
      return throwError(() => new Error("No location provided."));
    }

    //creates a workshop object to pass through to the API, id and host is handled in the backend null is temporary.
    let returnWorkshop: WorkshopNoHost = {
      title: title,
      description: description,
      location: location,
      date: dateAsDate
    }
    let tempstring = '/api/workshop?workshop_id='+workshop_id;
    return this.http.put<Workshop>(tempstring, returnWorkshop);      
    }
   }
}


 