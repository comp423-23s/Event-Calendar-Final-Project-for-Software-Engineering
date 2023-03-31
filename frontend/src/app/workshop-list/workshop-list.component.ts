import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import { Workshop, WorkshopListService } from '../workshop-list.service';


@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent {

  //public workshops$: Workshop
  constructor(protected workshopService: WorkshopListService) {
    //this.workshops$ = WorkshopListService.getWorkshop();

  }

  //

  public static Route: Route = {
    path: 'workshop-list',
    component: WorkshopListComponent, 
    title: 'WorkShop List', 
    canActivate: [isAuthenticated], 
    //resolve: { profile: profileResolver }
  };

  getWorkshop(){
    return this.workshopService.getWorkshop();
  }
}
