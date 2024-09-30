import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { ItemsComponent } from './layouts/items/items.component';
import { ServicesProviderComponent } from './layouts/services-provider/services-provider.component';
import { AddItemComponent } from './layouts/add-item/add-item.component';
import { CommunityComponent } from './layouts/community/community.component';

export const routes: Routes = [
    {
        path: "", component: BlankComponent, children: [
            { path: "", component: LandingComponent },
            { path: "items", component: ItemsComponent, title: "Items" },
            { path: "add-item", component: AddItemComponent, title: "Add New Item" },
            { path: "posts", component: CommunityComponent, title: "Discover others needs" }


        ]
    },
    {
        path: "", component: AuthComponent, children: [
            { path: "signup", component: SignUpComponent, title: "sign up" },
            { path: "login", component: LoginComponent, title: "login" }
        ]
    },
    // {
    //     path: "items", component: ItemsComponent, children: [
    //         { path: "main", component: ItemsComponent, title: "Items" },
    //     ]
    // }
    { path: "services", component: ServicesProviderComponent, title: "services" },

];
