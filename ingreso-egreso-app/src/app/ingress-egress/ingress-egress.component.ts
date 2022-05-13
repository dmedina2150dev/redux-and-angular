import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-ingress-egress',
	templateUrl: './ingress-egress.component.html',
	styles: [
	]
})
export class IngressEgressComponent implements OnInit {

	ingressForm!: FormGroup;
	type: string = 'ingreso';

	constructor(
		private fb: FormBuilder
	) { }

	ngOnInit(): void {

		this.ingressForm =  this.fb.group({
			description: ['', [ Validators.required ]],
			amount: [0, [ Validators.required ]]
		});
	}

	save() {

		if (this.ingressForm.invalid) { return; }

		console.log(this.ingressForm.value)
		console.log(this.type)
	}

}
