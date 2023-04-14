import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { Workshop } from '../workshop-list.service';
import { WorkshopCreateService } from '../workshop-create.service';
import { Profile } from '../profile/profile.service';
import { shareReplay } from 'rxjs';


interface User{
  id: number | null;
  pid: number
  onyen: String 
  first_name: String 
  last_name: String 
  email: String 
  pronouns: String
}


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
  };

  form = this.formBuilder.group({
    //title, decription, date, location
    title: '',
    description: '',
    date: '',
    location: ''
  })

  private profileID:number = 0;

  private user: User={
    id: 0,
    pid: 0,
    onyen: "String", 
    first_name: "String",
    last_name: "String",
    email: "String",
    pronouns: "String"
  }


  constructor(
    private formBuilder: FormBuilder,
    private workshopCreateService: WorkshopCreateService,
  ){
    this.workshopCreateService.getProfileSub().subscribe(profile=>{
      if(profile.id){
        this.profileID = profile.id
      }
      else{
        this.profileID = 101
      }
    } )
  }


  
  //When form is submitted it gets the information from the form and calls workshop create service and creates a workshop.
  onSubmit(): void{
    let form = this.form.value;
    let title = form.title ?? "";
    let description = form.description ?? "";
    let date = form.date?? "";
    let location = form.location ?? "";


    this.workshopCreateService
      .createWorkshop(title, description, location, date, this.profileID, this.user)
      .subscribe({
        next: (workshop) => this.onSuccess(workshop),
        error: (err) => this.onError(err)
      })
  }


  //Handles success message that occures when trying to create a workshop during the onSumbit function.
  //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
  private onSuccess(crtedWorkshop: Workshop): void{
    window.alert('Workshop has been created!');
    this.form.reset(); 
  }


  //Handles errors that occured when trying to create a workshop during the onSumbit function.
  //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
  private onError(err: Error){
    if(err.message){
      window.alert(err.message);
    }
    else{
      window.alert("Unkown Error: " + JSON.stringify(err));
    }
  }
  
}

