import { ObjectLayoutWidget } from "angular2-schema-form";
import { Component } from "@angular/core";

@Component({
	selector: "wizard-widget",
	template: `
	<button (click)="previousPage()" class="btn btn-default wizardBtn" [attr.disabled]="!hasPreviousPage()?true:null"> &lt; </button>
	<div class="wizardContent">
		<span *ngFor="let fieldset of schema.fieldsets; let i=index">
			<fieldset *ngIf="currentPage === i">
				<legend *ngIf="fieldset.title">{{fieldset.title}}</legend>
				<formelement *ngFor="let fieldId of fieldset.fields" [formProperty]="formProperty.getProperty(fieldId)" >
				</formelement>
			</fieldset>
		</span>
	</div>
	<button (click)="nextPage()" class="btn btn-default wizardBtn" [attr.disabled]="!hasNextPage()?true:null"> &gt; </button>
	`,
	styles: [require("./wizard.widget.css")]
})
export class WizardWidget extends ObjectLayoutWidget {
	private currentPage = null;

	ngOnInit() {
		this.currentPage = 0;
	}

	nextPage() {
		if (this.hasNextPage())
			++this.currentPage;
	}

	previousPage() {
		if (this.currentPage>0)
			--this.currentPage;
	}

	hasPreviousPage() {
		return this.currentPage > 0;
	}

	hasNextPage() {
		return this.currentPage + 1 < this.schema.fieldsets.length;
	}

}
