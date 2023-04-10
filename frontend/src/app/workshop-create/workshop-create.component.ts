import { Component } from '@angular/core';
import { isAuthenticated } from 'src/app/gate/gate.guard';
import { ActivatedRoute, Route } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { Workshop } from '../workshop-list.service';



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
    desciption: '',
    date: '',
    location: ''
  })

  constructor(
    private formBuilder: FormBuilder,
  ){}

  //When form is sumbited it gets the information from the form and calls workshoplist service(?) and creates a workshop. Gets user from the local data.
  onSumbit(): void{
    let form = this.form.value;
    let title = form.title ?? "";
    let desciption = form.desciption ?? "";
    let date = form.date?? "";
    let location = form.location ?? "";
    //let host = 

  }


  //Handles success message that occures when trying to create a workshop during the onSumbit function.
  //Nice to have: Make it so  it is not window alerts but intergated into the website HTML.
  private onSuccess(crtedWorkshop: Workshop): void{
    window.alert('${crtedWorkshop.title} has been created!');
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

