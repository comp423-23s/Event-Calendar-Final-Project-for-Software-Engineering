import { Injectable } from '@angular/core';

export interface Workshop {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkshopListService {

  constructor() { }
}
