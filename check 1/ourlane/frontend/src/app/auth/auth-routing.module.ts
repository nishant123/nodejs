import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
const routes: Routes = [
  {
    path: 'webadmin',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'reset-password/:email/:verificationCode',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'verifyEmail/:email/:verificationCode',
    loadChildren: () => import('./activate-email/activate-email.module').then(m => m.ActivateEmailModule)
  },
  {
    path: 'privacy-policy',   
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)

  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms.conditions.module').then(m => m.TermsConditionsModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
