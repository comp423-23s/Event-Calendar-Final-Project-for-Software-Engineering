import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import { WorkshopService, Workshop } from '../workshop-list.service';


@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent {

  public static Route: Route = {
    path: 'workshop-list',
    component: WorkshopListComponent, 
    title: 'WorkShop List', 
    canActivate: [isAuthenticated], 
    //resolve: { profile: profileResolver }
  };

}
