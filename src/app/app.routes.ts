import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }, 
    { path: '', component: HomeComponent },
    { path: 'add-invoice', component: InvoiceFormComponent },
    { path: 'invoice-detail/:id', component: InvoiceDetailComponent },
    { path: 'invoice-edit/:id', component: InvoiceEditComponent },

    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
