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
        console.log("profile acknowledged")
        this.user$ = profile;

        if(this.user$) {
          console.log("about to see if hosting is null")
          if(this.myWorkshopsService.getHosting(this.user$)) {
            console.log("initializing hosting")
            this.workshopsHosting$ = this.myWorkshopsService.getHosting(this.user$);
          }
        }
        else {
          console.log("error: user is null")
          throwError(() => new Error("User is null."));
        }

        if(this.user$) {
          console.log("about to see if attending is null")
          if(this.myWorkshopsService.getAttending(this.user$)) {
            console.log("initializing attending")
            this.workshopsAttending$ = this.myWorkshopsService.getAttending(this.user$);
          }
        }
        else {
          console.log("error: user is null")
          throwError(() => new Error("User is null."));
        }

      }
      else {
        this.user$ = null;
      }      
    });
  }

  getHosting() {
   /*
   Calls getHosting() from the MyWorkshopsService. 

   Args:
     None.
   
   Returns:
     None.

   Raises:
     Error.

   */
    if(this.user$) {
      console.log("get hosting calling service")
      this.workshopsHosting$ = this.myWorkshopsService.getHosting(this.user$);
    }
    else {
      throwError(() => new Error("User is null."));
    }
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
      console.log("get attending calling service")
      this.workshopsAttending$ = this.myWorkshopsService.getAttending(this.user$);
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
     if(this.user$) {
      this.workshopsHosting$ = this.myWorkshopsService.getHosting(this.user$);
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
