import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Workshop {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopListService {

  constructor(protected http: HttpClient) { 
    
  }

  getWorkshop(){
    //returns ? from workshop
    return this.http.get<Workshop>("/api/profile");
  }
}
