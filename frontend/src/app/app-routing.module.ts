import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppTitleStrategy } from './app-title.strategy';
import { GateComponent } from './gate/gate.component';
import { HomeComponent } from './home/home.component';
import { ProfileEditorComponent } from './profile/profile-editor/profile-editor.component';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';
import { WorkshopCreateComponent } from './workshop-create/workshop-create.component';
import { MyWorkshopsComponent } from './my-workshops/my-workshops.component';
import { WorkshopUpdateComponent } from './workshop-update/workshop-update.component';


const routes: Routes = [
  HomeComponent.Route,
  ProfileEditorComponent.Route,
  MyWorkshopsComponent.Route,
  WorkshopListComponent.Route,
  WorkshopCreateComponent.Route,
  WorkshopUpdateComponent.Route,
  GateComponent.Route,
  { path: 'admin', title: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: [AppTitleStrategy.Provider]
})
export class AppRoutingModule {}