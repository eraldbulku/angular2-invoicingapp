import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from './invoice';

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  invoices: Invoice[];
  text;
  errorText;
  searchResultText;

  constructor(
     private _authService: AuthenticationService,
     private _invoiceService: InvoiceService
     ){}

  ngOnInit(){
    this._authService.checkCredentials();

    this._invoiceService.getInvoicesHttp()
      .subscribe(resInvoiceData => this.invoices = resInvoiceData);
  }

  /* Add or copy invoice */
  addInvoice(invoiceText){
    if(invoiceText) {
      this.text = invoiceText;
    } else if(!this.text) {
      this.errorText = 'Invoice text cannot be empty';
      return;
    }
    var lastId = 0;
    if(this.invoices.length) {
      lastId = this.invoices[this.invoices.length - 1].id;
    }
    var newInvoice = {id: ++lastId, text: this.text};
    this.invoices.push(newInvoice);
    this._invoiceService.addInvoice(newInvoice);
    this.text = this.errorText = null;
  }

  /* Delete invoice */
  deleteInvoice(invoiceId){
    for (var i = 0; i < this.invoices.length; i++) {
      if(this.invoices[i].id == invoiceId){
        this.invoices.splice(i, 1);
      }
    }
    this._invoiceService.deleteInvoice(invoiceId);
  }

  /* Search invoice */
  search(term: string): void {
    this._invoiceService.searchInvoices(term)
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .subscribe(resInvoiceData => {
                          this.invoices = resInvoiceData;
                          this.searchResultText = !this.invoices.length ? 'No results' : null;
                        });
  }
}
