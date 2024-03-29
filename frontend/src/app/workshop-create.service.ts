import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Profile } from '../app/profile/profile.service';



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
  description: String;
  location: String;
  date: Date;
  host_id: number | null
  host: User | null
  attendees: User[] | null;
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
    //Checks if date, title, or description is null, if not it converts it from a string to a Date object.
    if(title === null || title === ""){
      return throwError(() => new Error("No title provided"))
    }
    //checks if title is at least 5 characters
    if (title.length < 5){
      return throwError(() => new Error("Title must be at least five characters long"));
    }
    //checks that title is not all white space
    if(this.isWhiteSpace(title)){
      return throwError(() => new Error("title cannot be all white space"))
    }
    //makes sure date is provided
    if(date === null || date === ""){
      return throwError(() => new Error("No date provided."));
    }
    else{
      let dateAsDate: Date = new Date(date);
    
    //makes sure a description is provided
    if(description === null || description === ""){
      return throwError(() => new Error("No description provided."));
    }
    //makes sure the description is at least 5 characters long
    if(description.length < 5){
      return throwError(() => new Error("The description must be at least 5 characters long"))
    }
    //makes sure the description is not all white space
    if(this.isWhiteSpace(description)){
      return throwError(() => new Error("description cannot be all white space"))
    }
    //makes sure there is a location
    if(location === null || location === ""){
      return throwError(() => new Error("No location provided."));
    }
    //ensures the location is at least 4 characters long
    if(location.length < 4){
      return throwError(() => new Error("The location must be at least 4 characters long"))
    }
    //makes sure the location is not all white space
    if(this.isWhiteSpace(location)){
      return throwError(() => new Error("location cannot be all white space"))
    }
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
      host: user,
      attendees: []
    }
    return this.http.post<Workshop>('/api/workshop', returnWorkshop);      
    }
   }

   //returns an observable profile
   getProfileSub(): Observable<Profile>{
    return this.http.get<Profile>('/api/profile');
   }

  //takes in a string. Returns true if the string is all white space, false if it isn't
  isWhiteSpace(string: String){
    let white_space:boolean  = true;
    for(let i = 0; i < string.length; i++ ){
      if(string.charAt(i) == " " || string.charAt(i) == "  "){
        continue
      }
      else{ 
        white_space = false;
      }
    }
    if(white_space == true){
      return true
    }
    return false
  }
  }
