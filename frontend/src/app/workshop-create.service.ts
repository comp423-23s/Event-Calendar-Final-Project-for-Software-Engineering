import { HostBinding, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,map, Subscription } from 'rxjs';
import { Profile, ProfileService } from '../app/profile/profile.service';
import { mergeMap, of, shareReplay } from 'rxjs';
import { AuthenticationService } from './authentication.service';


interface User{
  id: number | null;
  pid: number
  onyen: String 
  first_name: String 
  last_name: String 
  email: String 
  pronouns: String
}


export interface Workshop {
  id: number,
  title: String;
  description: String | null;
  location: String | null;
  date: Date | null;
  host_id: number | null
  host: User | null
}

@Injectable({
  providedIn: 'root'
})

export class WorkshopCreateService {

  
  constructor(protected http: HttpClient) { 

  }


  /**
   Returns the create workshop or an Error.

      Args:
        title: string,
        description: string,
        location: string, 
        date: string,
        hostid: number,
        user: User
      
      Returns:
        The create workshop or an Error.

      Raises:
        Error: No date provided.,
        Error: Error getting profile ID.,
        Error: Error getting profile.
   */
  createWorkshop(title: string, description: string, location: string, date: string, hostid: number, user: User): Observable<Workshop>{

    //Checks if date is null, if not it converts it from a string to a Date object.
    console.log("Create service start")
    if(date === null || date === ""){
      return throwError(() => new Error("No date provided."));
    }
    else{
      let dateAsDate: Date = new Date(date);

 
    //if hostID is null or undefined an error is thrown.
    if (hostid == null || hostid ==undefined){
      return throwError(() => new Error("Profile ID is either null or undefined."));
    } 

    //creates a workshop object to pass through to the API, id and host is handled in the backend null is temporary.
    let returnWorkshop: Workshop = {
      id: 10,
      title: title,
      description: description,
      location: location,
      date: dateAsDate,
      host_id: hostid,
      host: user
    }
    console.log("title: " + title)
    console.log("host_id: " + hostid)
    console.log("Create service return below...")
    return this.http.post<Workshop>('/api/workshop', returnWorkshop);      
    }
   }

   //returns an observable profile
   getProfileSub(): Observable<Profile>{
    return this.http.get<Profile>('/api/profile');
   }
  }
