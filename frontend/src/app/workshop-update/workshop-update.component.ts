import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { isAuthenticated } from '../gate/gate.guard';
import { FormBuilder } from '@angular/forms';
import { WorkshopUpdateService } from '../workshop-update.service';
import { Workshop } from '../workshop-create.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-workshop-update',
  templateUrl: './workshop-update.component.html',
  styleUrls: ['./workshop-update.component.css']
})
export class WorkshopUpdateComponent {
  public workshopUpdating$: Workshop | null = null;

  public static Route: Route = {
    path: 'workshop-update',
    component: WorkshopUpdateComponent, 
    title: 'Edit Workshop', 
    canActivate: [isAuthenticated], 
  };

  form = this.formBuilder.group({
    //title, decription, date, location
    title: '',
    description: '',
    date: '',
    location: ''
  })

  constructor(
    private workshopUpdateService: WorkshopUpdateService, 
    private formBuilder: FormBuilder) {
      if(this.workshopUpdateService.getWorkshop()) {
        this.workshopUpdating$ = this.workshopUpdateService.getWorkshop();
      }
    }

    updateWorkshop() {
     /*
     Calls updateWorkshop() from the MyWorkshopsService. 
  
     Args:
       The workshop you are updating
     
     Returns:
       None.
  
     Raises:
       Error 
  
     */
      let form = this.form.value;
      if(this.workshopUpdating$) {
        let title = this.workshopUpdating$.title;
        let description = this.workshopUpdating$.description;
        let location = this.workshopUpdating$.location;
        let date = this.workshopUpdating$.date.toString();

        if(!(form.title === null || form.title === "" || form.title === undefined)) {
          title = form.title;  
        }
        if(!(form.description === null || form.description === "" || form.description === undefined)) {
          description = form.description;
        }
        if(!(form.date === null || form.date === "" || form.date === undefined)) {
          date = form.date;
          date = date.toString();
        }
        if(!(form.location === null || form.location === "" || form.location === undefined)) {
          location = form.location;
        }

        this.workshopUpdateService
          .updateWorkshop(this.workshopUpdating$.id, title, description, location, date)
          .subscribe({
            next: (workshop) => this.onSuccess(),
            error: (err) => this.onError(err)
          })
      }
      else {
        throwError(() => new Error("Workshop is null."));
      }
    }
  
    //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
    private onSuccess(): void{
     /*
     Handles success message that occures when trying to update a workshop during the onSumbit function.
  
     Args:
       None.
     
     Returns:
       None.
  
     Raises:
       None. 
  
     */
      window.alert('Workshop has been updated!');
      this.form.reset(); 
    }
  
    //Nice to have: Make it so it is not window alerts but intergated into the website HTML.
    private onError(err: Error){
     /*
     Handles errors that occured when trying to update a workshop during the onSumbit function.
  
     Args:
       err: Error.
     
     Returns:
       None.
  
     Raises:
       None. 
  
     */
      if(err.message){
        window.alert(err.message);
      }
      else{
        window.alert("Unkown Error: " + JSON.stringify(err));
      }
    }  
}
