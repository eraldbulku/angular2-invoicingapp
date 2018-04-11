import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InitInvoices } from '../init-invoices';
import { Invoice } from '../invoice/invoice';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class InvoiceService extends InitInvoices {

  private invoicesUrl = 'api/invoices';  // URL to web api

  constructor(private http: HttpClient) { 
    super();
    console.log('InvoiceService initialized...');
    this.load();
  }

  // Get Invoices from the local storage
  getInvoicesStorage() {
    var invoices = JSON.parse(localStorage.getItem('invoices'));
    return invoices;
  }

  // Add Invoice
  addInvoice(newInvoice: Invoice){
    var invoices = JSON.parse(localStorage.getItem('invoices'));
    // Add new
    invoices.push(newInvoice);
    // Set in local storage
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Set in api
    this.addInvoiceHttp(newInvoice);
  }

  // Delete Invoice
  deleteInvoice(invoiceId: number){
    var invoices = JSON.parse(localStorage.getItem('invoices'));

    for (var i = 0; i < invoices.length; i++) {
      if(invoices[i].id == invoiceId) {
        invoices.splice(i, 1);
      }
    }
    // Set New Todos
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Delete from api
    this.deleteInvoiceHttp(invoiceId);
  }

  // Search Invoices
  searchInvoices(term: string) {
    if (!term.trim()) {
      this.getInvoicesHttp();
    }
    return this.http.get(this.invoicesUrl + `/?text=${term}`)
      .map((response:Invoice[]) => response);
  }

  // Get Invoices with API call
  getInvoicesHttp(){
    return this.http.get(this.invoicesUrl)
      .map((response:Invoice[]) => response);
  }

  // Delete Invoice with API call
  deleteInvoiceHttp(invoiceId: number){
    this.http.delete<Invoice>(`${this.invoicesUrl}/${invoiceId}`, httpOptions)
                              .catch(this._errorHandler)
                              .subscribe();
  }

  // Add Invoice with API call
  addInvoiceHttp(newInvoice: Invoice){
    this.http.post<Invoice>(this.invoicesUrl, newInvoice, httpOptions)
                              .catch(this._errorHandler)
                              .subscribe();
  }

  // Error message
  _errorHandler(error: Response){
    console.error(error);
    return Observable.throw(error || "Server Error");
  }

}
