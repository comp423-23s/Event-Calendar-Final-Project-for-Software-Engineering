import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Workshop } from './workshop-list.service';

@Injectable({
  providedIn: 'root'
})

export class WorkshopDeleteService {

  constructor(protected http: HttpClient) { }

  //Takes in the id of the workshop and calls the workshop delete api. Throws error if there is one.
  deleteWorkshop(id: number): Observable<any>{
    try{
      let tempString = '/api/workshop?id=' + id
      return this.http.delete<Workshop>(tempString)
    }
    catch(e: any){
      return throwError(()=> new Error("Error deleting workshop."))
    }
  }
}