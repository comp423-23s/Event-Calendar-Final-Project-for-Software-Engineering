import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { User, Workshop, WorkshopNoHost } from './workshop-list.service';


@Injectable({
  providedIn: 'root'
})
export class WorkshopUpdateService {
  public workshop$: Workshop | null = null;

  constructor(protected http: HttpClient) { }

  /**
   Returns the updated workshop or an Error.

      Args:
        workshop_id: number
        title: string,
        description: string,
        location: string, 
        date: string,
        hostid: number,
        user: User
      
      Returns:
        The updated workshop or an Error.

      Raises:
        Error: No date provided.,
        Error: No description provided.,
        Error: No location provided..
   */
  updateWorkshop(id: number, title: String, description: String, location: String, date: string): Observable<Workshop>{
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

    //updates a workshop object to pass through to the API, id and host is handled in the backend null is temporary.
    let returnWorkshop: WorkshopNoHost = {
      title: title,
      description: description,
      location: location,
      date: dateAsDate
    }
    let tempstring = '/api/workshop?workshop_id=' + id;
    return this.http.put<Workshop>(tempstring, returnWorkshop);      
    }
   }

   setWorkshop(workshop: Workshop) {
    this.workshop$ = workshop;
   }

   getWorkshop(): Workshop | null {
    if(this.workshop$) {
      return this.workshop$;
    }
    else {
      throwError(() => new Error("Workshop is null."));
      return null;
    }
   }
}


 