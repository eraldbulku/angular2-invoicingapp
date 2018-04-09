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

  deleteInvoice(invoiceId){
    var invoices = JSON.parse(localStorage.getItem('invoices'));

    for (var i = 0; i < invoices.length; i++) {
      if(invoices[i].id == invoiceId) {
        invoices.splice(i, 1);
      }
    }
    // Set New Todos
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }

}
