import { Injectable } from '@angular/core';
import { InitInvoices } from '../init-invoices';

@Injectable()
export class InvoiceService extends InitInvoices {

  constructor() { 
    super();
    console.log('InvoiceService initialized...');
    this.load();
  }

  getInvoices(){
    var invoices = JSON.parse(localStorage.getItem('invoices'));
    return invoices;
  }

  addInvoice(newInvoice){
    var invoices = JSON.parse(localStorage.getItem('invoices'));
    // Add new
    invoices.push(newInvoice);
    // Set in local storage
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }

}
