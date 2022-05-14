import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const routesChild: Routes = [
  { 
		path: '', 
		component: DashboardComponent,
		children: dashboardRoutes,
		// canActivate: [ AuthGuard ]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routesChild)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

