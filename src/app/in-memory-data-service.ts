import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
   if(localStorage.getItem('invoices') === null || localStorage.getItem('invoices') == undefined){
      return {};
    } else {
      const invoices = JSON.parse(localStorage.getItem('invoices'));
      return {invoices};
    }
  }
}
