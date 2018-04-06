import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
	template: '<h3 style="margin-top: 100px">Page Not Found</h3>'
})

export class PageNotFoundComponent {
	constructor(
	   private _service:AuthenticationService){}
	
	ngOnInit(){
	   this._service.checkCredentials();
	}
}
