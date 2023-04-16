import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import { Workshop, WorkshopListService } from '../workshop-list.service';
import { Observable } from 'rxjs';
import { WorkshopDeleteService } from '../workshop-delete.service'

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent {

  public workshops$: Observable<Workshop[]>;
  workshopService: WorkshopListService

  constructor(workshopService: WorkshopListService, private workshopDeleteService: WorkshopDeleteService) {
    this.workshops$ = workshopService.getWorkshops();
    this.workshopService = workshopService;
  }

  public static Route: Route = {
    path: 'workshop-list',
    component: WorkshopListComponent, 
    title: 'WorkShop List', 
    canActivate: [isAuthenticated]
  };

  getWorkshops(): Observable<Workshop[]>{
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
    return this.workshopService.getWorkshops();
  }
  
  deleteWorkshop(id: number){
    this.workshopDeleteService.deleteWorkshop(id)
    .subscribe({
      next: (msg)=> this.onDelSuccess(msg),
      error: (err) => this.onDelError(err)
    })
  }

  onDelSuccess(msg: Workshop){
      window.alert("Workshop has been deleted.")
      this.workshops$ = this.workshopService.getWorkshops();
  }

  onDelError(err: Error){
    if(err.message){
      window.alert(err.message)
    }
    else{
      window.alert("Unknown error: " + JSON.stringify(err))
    }
  }

}
