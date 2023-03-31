import { Injectable } from '@angular/core';

export interface Workshop {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopListService {

  constructor(workshopservice: WorkshopListService) { 
    
  }

  getWorkshop(){
    let sampleWorkshop = [1, "This is a workshop"];
    return sampleWorkshop;
  }
}
