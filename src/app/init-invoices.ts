export class InitInvoices{
  load(){
    if(localStorage.getItem('invoices') === null || localStorage.getItem('invoices') == undefined){
      var invoices = [
        {
          id: 1,
          text: 'Invoice1',
        },
        {
          id: 2,
          text: 'Invoice2',
        },
        {
          id: 3,
          text: 'Invoice3',
        },
        {
          id: 4,
          text: 'Invoice4',
        },
        {
          id: 5,
          text: 'Invoice5',
        }
      ];

      localStorage.setItem('invoices', JSON.stringify(invoices));
      return;
    } else {
      console.log('Found Invoices...');
    }
  }
}
