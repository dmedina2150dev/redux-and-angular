import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IngressEgress } from 'src/app/models/ingress-egress.model';

import { AppState } from 'src/app/state/app.state';

import { ChartData, ChartType } from 'chart.js';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styles: [
	]
})
export class StatisticsComponent implements OnInit, OnDestroy {

	ingress: number = 0;
	totalIngress: number = 0;
	egress: number = 0;
	totalEgress: number = 0;

	itemsSub!: Subscription;

	public doughnutChartLabels: string[] = ['Egresos', 'Ingresos'];
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartData: ChartData<'doughnut'> = {
		labels: this.doughnutChartLabels,
		datasets: []
	};

	constructor(
		private store: Store<AppState>
	) {

	}

	ngOnInit(): void {
		this.itemsSub = this.store.select('ingressEgress')
			.subscribe(({ items }) => this.generateStatistics(items));
	}

	ngOnDestroy(): void {
		this.itemsSub.unsubscribe();
	}

	generateStatistics(items: IngressEgress[]) {

		this.totalEgress = 0;
		this.totalIngress = 0;
		this.ingress = 0;
		this.egress = 0; 

		for (const item of items) {
			if (item.type === 'ingreso') {
				this.totalIngress += item.amount;
				this.ingress++;
			} else {
				this.totalEgress += item.amount;
				this.egress++;
			}

		}
		this.doughnutChartData.datasets = [ { data: [this.totalEgress, this.totalIngress]}]
	}

}
