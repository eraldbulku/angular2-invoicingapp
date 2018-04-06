import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from './invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  invoices: Invoice[];
  text;

  constructor(
     private _authService: AuthenticationService,
     private _invoiceService: InvoiceService
     ){}

  ngOnInit(){
     this._authService.checkCredentials();
     this.invoices = this._invoiceService.getInvoices();
  }

  logout() {
     this._authService.logout();
  }

  addInvoice(){
    if(this.text) {
      var lastId = 0;
      if(this.invoices.length) {
        lastId = this.invoices[this.invoices.length - 1].id;
      }
      var newInvoice = {
        id: ++lastId,
        text: this.text
      }
      this.invoices.push(newInvoice);
      this._invoiceService.addInvoice(newInvoice);
      this.text = null;
    }
  }
}
