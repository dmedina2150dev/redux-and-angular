import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { NgChartsModule } from 'ng2-charts';

import { IngressEgressComponent } from './ingress-egress.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrdenIngressPipe } from '../pipes/orden-ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ingressEgressReducer } from '../state/ingress-egress/ingress-egress.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrdenIngressPipe

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,

    DashboardRoutingModule,

    StoreModule.forFeature('ingressEgress', ingressEgressReducer)

  ],
  exports: [
    DashboardComponent,
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
  ]
})
export class IngressEgressModule { }
