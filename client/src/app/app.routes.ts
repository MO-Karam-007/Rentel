import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { ItemsComponent } from './components/items/items.component';
import { ServicesProviderComponent } from './components/services-provider/services-provider.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CommunityComponent } from './components/community/community.component';
import { Farme2Component } from './components/farme2/farme2.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ReviewComponent } from './review/review.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { MessageMainComponent } from './message-main/message-main.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'items', component: ItemsComponent, title: 'Items' },
      { path: 'add-item', component: AddItemComponent, title: 'Add New Item' },
      {
        path: 'posts',
        component: CommunityComponent,
        title: 'Discover others needs',
      },
      { path: 'frame', component: Farme2Component },
      { path: 'profile', component: ProfileComponent },
      { path: 'messenger', component: MessageMainComponent, title: 'Messeges' },
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'notifications',
      },
      // { path: "dashboard", component: DashBoardComponent },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signup', component: SignUpComponent, title: 'sign up' },
      { path: 'login', component: LoginComponent, title: 'login' },
    ],
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'dashboard', component: DashBoardComponent, title: 'Dashboard' },
      { path: 'my-profile', component: ProfileComponent, title: 'My Profile' },
      { path: 'transactions', component: TransactionsComponent, title: 'Transactions' },
      { path: 'my-wishlist', component: FavoritesComponent, title: 'My Wishlist' },
    ],
  },

  { path: 'services', component: ServicesProviderComponent, title: 'services' },
];
