import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent {

  constructor(
	   private _service:AuthenticationService){}

	ngOnInit(){
	   this._service.checkCredentials();
	}

	logout() {
	   this._service.logout();
	}

}
