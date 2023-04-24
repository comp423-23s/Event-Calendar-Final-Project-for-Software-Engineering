import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { MyWorkshopsService } from '../my-workshops.service';
import { User, Workshop, WorkshopListService } from '../workshop-list.service';
import { Observable, throwError } from 'rxjs';
import { WorkshopDeleteService } from '../workshop-delete.service';


@Component({
  selector: 'app-my-workshops',
  templateUrl: './my-workshops.component.html',
  styleUrls: ['./my-workshops.component.css']
})
export class MyWorkshopsComponent {
  private user$: User | null = null;
  public workshopsHosting$: Observable<Workshop[]> | null = null;
  public workshopsAttending$: Observable<Workshop[]> | null = null;

  public static Route: Route = {
    path: 'my-workshops',
    component: MyWorkshopsComponent, 
    title: 'My Workshops', 
    canActivate: [isAuthenticated], 
  };

  constructor(private myWorkshopsService: MyWorkshopsService, 
    private workshopDeleteService: WorkshopDeleteService, 
    private workshopListService: WorkshopListService) {
      
    myWorkshopsService.getUser().subscribe(profile => {
      if(profile) {
        this.user$ = profile;
      }
      else {
        this.user$ = null;
      }
    });

    if(this.myWorkshopsService.getHosting()) {
      this.workshopsHosting$ = this.myWorkshopsService.getHosting();
    }

    if(this.user$) {
      if(this.myWorkshopsService.getAttending(this.user$)) {
        this.workshopsAttending$ = this.myWorkshopsService.getAttending(this.user$);
      }
    }
    else {
      throwError(() => new Error("User is null."));
    }

  }

  getHosting() {
   /*
   Calls getHosting() from the MyWorkshopsService. 

   Args:
     None.
   
   Returns:
     None.

   Raises:
     None.

   */
    this.myWorkshopsService.getHosting();
  }

  getAttending() {
   /*
   Calls getAttending() from the MyWorkshopsService. 

   Args:
     None.
   
   Returns:
     None.

   Raises:
     Error.

   */
    if(this.user$) {
      this.myWorkshopsService.getAttending(this.user$);
    }
    else {
      throwError(() => new Error("User is null."));
    }
  }

  deleteWorkshop(id: number){
   /*
   Calls the workshop delete service and then the deleteWorkshop function. On success it calls onDelSuccess() on error it calls onDelError(). 

   Args:
     id: number.
   
   Returns:
     None.

   Raises:
     Error.

   */
   this.workshopDeleteService.deleteWorkshop(id)
   .subscribe({
     next: (msg)=> this.onDelSuccess(msg),
     error: (err) => this.onDelError(err)
   })
 }

 //Gives a success message and updates workshop list, since one has been deleted.
 onDelSuccess(msg: Workshop){
     window.alert("Workshop has been deleted.")
     this.workshopsHosting$ = this.myWorkshopsService.getHosting();
     if(this.user$) {
      this.workshopsAttending$ = this.myWorkshopsService.getAttending(this.user$);
     }
     else {
      throwError(() => new Error("User is null."));
     }
 }

 //Passes on error message to user.
 onDelError(err: Error){
   if(err.message){
     window.alert(err.message)
   }
   else{
     window.alert("Unknown error: " + JSON.stringify(err))
   }
 }

}
