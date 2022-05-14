import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ 
		path: '',
		// canActivate: [ AuthGuard ],//TODO: Este funciona para bloquear las rutas pero carga el modulo igual
		canLoad: [ AuthGuard ], //TODO: Este funciona igual que el cantActivate pero previene la carga del modulo (se debe implementar el CantLoad en el guadian)
		loadChildren: () => import('./ingress-egress/ingress-egress.module').then( m => m.IngressEgressModule)
	},
	{ path: '**', redirectTo: '' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
