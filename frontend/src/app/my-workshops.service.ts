import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Workshop } from './workshop-list.service';

@Injectable({
  providedIn: 'root'
})
export class MyWorkshopsService {

  constructor(protected http: HttpClient) { }

  getUser(): Observable<User>{
    /*
    Calls the API to get the user.

    Args:
      None.
    
    Returns:
      Obervable<User>.

    Raises:
      None.

    */
    return this.http.get<User>("/api/profile");
  }

  getHosting(user: User): Observable<Workshop[]> | null {
    /*
    Gets the list of workshops the user is hosting.

    Args:
      user: User.
    
    Returns:
      Observable<Workshop[]> | null.

    Raises:
      None.

    */
      let tempString = '/api/user/hosting/{id}?i=' + user.id
      return this.http.get<Workshop[]>(tempString);
    }

  getAttending(user: User): Observable<Workshop[]> | null {
    /*
    Gets the list of workshops the user is attending.

    Args:
      user: User.
    
    Returns:
      Observable<Workshop[]> | null.

    Raises:
      None.

    */
      let tempString = '/api/user/attending/{id}?i=' + user.id
      return this.http.get<Workshop[]>(tempString);
  }

}
