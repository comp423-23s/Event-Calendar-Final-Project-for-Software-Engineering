import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-workshop-create',
  templateUrl: './workshop-create.component.html',
  styleUrls: ['./workshop-create.component.css']
})
export class WorkshopCreateComponent {
  public static Route: Route = {
    path: 'workshop-create',
    component: WorkshopCreateComponent, 
    title: 'Create Workshop', 
    canActivate: [isAuthenticated], 
    //resolve: { profile: profileResolver }
  };

}
