import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { Workshop } from '../workshop-list.service';
import { WorkshopCreateService } from '../workshop-create.service';



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

  form = this.formBuilder.group({
    //title, decription, date, location
    title: '',
    description: '',
    date: '',
    location: ''
  })

  constructor(
    private formBuilder: FormBuilder,
    private workshopCreateService: WorkshopCreateService,
  ){}

  //When form is sumbited it gets the information from the form and calls workshop create service and creates a workshop.
  onSubmit(): void{
    console.log("On submit start")
    let form = this.form.value;
    let title = form.title ?? "";
    let description = form.description ?? "";
    let date = form.date?? "";
    let location = form.location ?? "";
    
    console.log("Calling create service...")
    this.workshopCreateService
      .createWorkshop(title, description, location, date)
      .subscribe({
        next: (workshop) => this.onSuccess(workshop),
        error: (err) => this.onError(err)
      })
    console.log("on submit end")
  }


  //Handles success message that occures when trying to create a workshop during the onSumbit function.
  //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
  private onSuccess(crtedWorkshop: Workshop): void{
    console.log("success message.")
    window.alert('${crtedWorkshop.title} has been created!');
    this.form.reset(); 
  }


  //Handles errors that occured when trying to create a workshop during the onSumbit function.
  //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
  //500 error might mean that it is already in the database.
  private onError(err: Error){
    if(err.message){
      window.alert(err.message);
    }
    else{
      window.alert("Unkown Error: " + JSON.stringify(err));
    }
  }
  
}

