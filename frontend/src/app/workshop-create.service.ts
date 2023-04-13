import { HostBinding, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,map, Subscription } from 'rxjs';
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
  private profile$
  private profileID
  
  constructor(protected http: HttpClient) { 
    this.profile$ = this.http.get<Profile>('/api/profile');
    let profileID = 0;
    const profileSub = this.profile$.subscribe({
      next(Profile){
        if(Profile.id === null){
          profileID = 0
          return null
        }
        else{
          console.log("Profile ID from subscription: "+ Profile.id)
          profileID = Profile.id
          return Profile.id
        }
      }
    })
    this.profileID = profileID
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


    // let hostIDProfile = profile.pipe(
    //   map(profile=>{
    //     if (profile === undefined || null){
    //       return null
    //     }
    //     else{
    //       return profile.subscribe()
    //     }
    //   })
    // )


    //if hostID cannot be found an error is thrown.
    if (this.profileID == null || this.profileID ==undefined){
      return throwError(() => new Error("Error getting profile ID."));
    } 

      //creates a workshop object to pass through to the API, id and host is handled in the backend null is temporary.
    let returnWorkshop = {
      id: null,
      title: title,
      description: description,
      location: location,
      date: dateAsDate,
      host_id: this.profileID,
      host: null
    }
    console.log("title: " + title)
    console.log("host_id: " + this.profileID)
    console.log("Create service return below...")
    return this.http.post<Workshop>('/api/workshop', returnWorkshop);      
    }
   }
  }
