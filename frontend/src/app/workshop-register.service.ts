import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Workshop } from './workshop-list.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopRegisterService {

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

  registerUser(workshopId: number, userId: number) {
    /*
    Calls the API to register the user. 

    Args:
      workshopId: number.
      userId: number.
    
    Returns:
      Obervable<Workshop> | Null.

    Raises:
      None.

    */
    return this.http.post<Workshop>("/api/workshop/register", {workshopId, userId});
  }
}
