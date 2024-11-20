import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './guards/auth.guards';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent }, 
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'add-invoice', component: InvoiceFormComponent, canActivate: [AuthGuard] },
    { path: 'invoice-detail/:id', component: InvoiceDetailComponent, canActivate: [AuthGuard] },
    { path: 'invoice-edit/:id', component: InvoiceEditComponent, canActivate: [AuthGuard] }, 
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
