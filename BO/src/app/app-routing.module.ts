import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Core/login/login.component';
import 'hammerjs';
import { InfoServerComponent } from './Core/infoServer/infoServer.component.';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'infos', canActivate: [AuthGuard], component: InfoServerComponent },
  //{ path: 'lumos', canActivate: [AuthGuard], component: LumosComponent },
  //{ path: 'karma', canActivate: [AuthGuard], component: KarmaComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
