import { HostBinding, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,map } from 'rxjs';
import { Profile, ProfileService } from '../app/profile/profile.service';



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

  private profile$: Observable<Profile| undefined>;

  constructor(protected http: HttpClient, private profileservice: ProfileService) { 
    this.profile$ = profileservice.profile$;
  }


  /**
   Returns the create workshop or an Error.

      Args:
        title: string,
        description: string,
        location: string, 
        date: string
      
      Returns:
        The create workshop or an Error.

      Raises:
        Error: No date provided.,
        Error: Error getting profile ID.,
        Error: Error getting profile.
   */
  createWorkshop(title: string, description: string, location: string, date: string ): Observable<Workshop>{
    //Checks if date is null, if not it converts it from a string to a Date object.
    console.log("Create service start")
    if(date === null || date === ""){
      return throwError(() => new Error("No date provided."));
    }
    else{
      let dateAsDate: Date = new Date(date);

      //goes through the observable profile and gets the profiles ID, then if there is no profile it stores null.
       let hostIDProfile = this.profile$.pipe(
        map(profile => {
            if (profile === undefined || null) {
                return null;
            } else {
                console.log("profile id found.")
                return profile.id
            }
        })
    ); 

    //if hostID cannot be found an error is thrown.
     if (hostIDProfile == null || undefined){
      return throwError(() => new Error("Error getting profile ID."));
    } 

    //goes through the observable profile and gets the profile as an object, if there is not profile it stores null.
     let workhostProfile = this.profile$.pipe(
       map(profile => {
           if (profile === undefined) {
               return null;
           } else {
               console.log("found profile.")
               return profile
           }
       })
      ); 
       //if host cannot be found an error is thrown.
       if(workhostProfile == null ||undefined){
         return throwError(() => new Error("Error getting profile."));
       }

      //creates a workshop object to pass through to the API, id is handled in the backend null is temporary.


      /////////////////////////////////////Begin test Variables//////////////////////////////////////////////
      let hostID = 2;

      //2	100000000	sol	sol@unc.edu	Sol	Student	they / them
      let workhost = {
        id: 2,
        pid: 100000000,
        onyen: 	"sol", 
        first_name: "Sol",
        last_name: "Student",
        email: "sol@unc.edu",
        pronouns: "they / them"
      }

      ////////////////////////////////////////////////////////END TEST VARIABLES/////////////////////////////////////////////////////////

      let returnWorkshop = {
        id: 10,
        title: title,
        description: description,
        location: location,
        date: dateAsDate,
        host_id: hostID,
        host: workhost
      }
      console.log("title: " + title)
      console.log("host_id: " + hostID)

      
      console.log("Create service return below...")
      return this.http.post<Workshop>('/api/workshop', returnWorkshop);
      
    }
   }
  }
