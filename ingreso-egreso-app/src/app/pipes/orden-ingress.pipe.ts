import { Pipe, PipeTransform } from '@angular/core';
import { IngressEgress } from '../models/ingress-egress.model';

@Pipe({
	name: 'ordenIngress'
})
export class OrdenIngressPipe implements PipeTransform {

	transform(items: IngressEgress[]): IngressEgress[] {
		return items.sort((a, b) => {

			if ( a.type === 'ingreso') {
				return -1;
			} else {
				return 1;
			}
		})
	}

}
