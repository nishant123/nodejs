import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { OnGoingBookingsComponent } from './on-going-trips/on-going/on-going-bookings.component';
import { AllBookingsComponent } from './all-bookings.component';
import { OnGoingTripsComponent } from './on-going-trips/on-going-trips.component';
import { CompleteComponent } from './complete-trips/complete.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule } from '@agm/core';
import { AuthGuardGuard } from 'src/app/util/authGuard/auth-guard.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'scheduled-created-trips',
        pathMatch: 'full'
      },
      {
        path: 'scheduled-created-trips',
        component: AllBookingsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'on-going-trips/:tripId',
        component: OnGoingBookingsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'on-going-trips',
        component: OnGoingTripsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'completed-cancel-trips',
        component: CompleteComponent,
        canActivate: [AuthGuardGuard]
      }
    ]
  }
];


@NgModule({
  declarations: [
    AllBookingsComponent,
    OnGoingBookingsComponent,
    OnGoingTripsComponent,
    CompleteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmSnazzyInfoWindowModule,
    AgmDirectionModule,
    AgmCoreModule
  ]
})
export class AllBookingsModule { }
