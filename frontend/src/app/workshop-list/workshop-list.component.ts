import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import { User, Workshop, WorkshopListService } from '../workshop-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent {

  public workshops$: Observable<Workshop[]>;
  //public hosts$: Observable<User[]> | null;
  workshopService: WorkshopListService;
  //public hosts: User

  constructor(workshopService: WorkshopListService) {
    this.workshopService = workshopService;
    this.workshops$ = workshopService.getWorkshops();
    
  }

  public static Route: Route = {
    path: 'workshop-list',
    component: WorkshopListComponent, 
    title: 'WorkShop List', 
    canActivate: [isAuthenticated]
  };

  getWorkshops(){
    /*
    Fetches an observable list of workshops from workshop service and puts in public variable workshops$. Workshop service gets the list from an api call which queires our database for all workshops.

    Args:
      None.
    
    Returns:
      None.

    Raises:
      None.

    */
    this.workshops$ = this.workshopService.getWorkshops();
  }

}
