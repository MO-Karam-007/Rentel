import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    {path: "", component:BlankComponent, children: [
        {path:"", component:LandingComponent}
    ]},
    {path: "", component:AuthComponent, children: [
       {path: "signup", component:SignUpComponent,title:"sign up"},
       {path: "login", component:LoginComponent, title: "login"}
    ]}
];
