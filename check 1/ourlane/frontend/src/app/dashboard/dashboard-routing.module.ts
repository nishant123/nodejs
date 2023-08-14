import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../util/authGuard/auth-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'car',
    loadChildren: () => import('./car/car.module').then(m => m.CarModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'all-bookings',
    loadChildren: () => import('./all-bookings/all-bookings.module').then(m => m.AllBookingsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'accountsetting',
    loadChildren: () => import('./account-settings/account-settings.module').then(m => m.AccountSettingsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'driver-management',
    loadChildren: () => import('./driver-management/driver-management.module').then(m => m.DriverManagementModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'chat-call-support',
    loadChildren: () => import('./chat-call-support/chat-call-support.module').then(m => m.ChatCallSupportModule),
    canActivate: [AuthGuardGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
