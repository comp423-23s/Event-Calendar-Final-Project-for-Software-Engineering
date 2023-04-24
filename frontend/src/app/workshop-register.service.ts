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
    return this.http.get<User>("/api/profile");
  }

  registerUser(workshopId: number, userId: number) {
    return this.http.post<Workshop>("/api/workshop/register", {workshopId, userId});
  }
}
