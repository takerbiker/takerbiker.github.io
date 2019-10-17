const XeroClient = require("xero-node").AccountingAPIClient;

const config = {
  "appType" : "private",
  "consumerKey": "QLZID0Y6ZBSLNJUPWHS1EBTOTEMTDN",
  "consumerSecret": "SQLYDEMPXDYRW66W7YSCKDD28GYBJB",
  "privateKeyPath": "/Users/shahranirahiman/Projects/GA_Projects/takerbiker.github.io/Bears_Dashboard/privatekey.pem"
};


(async function() {
  let xero = new XeroClient(config);

  // To create
  // await xero.contacts.create({
  //   Name: "Shahrani"
  // })

  //To print out data results
  const result = await xero.contacts.get();
  let emailAddress = result.Contacts[2].EmailAddress;
  console.log(emailAddress);


  xeroClient.core.invoices.getInvoices()
    .then(invoices => {
      console.log("Invoics: " + invoices.length);
    }).catch(err => {
      console.log(err);
    });


    // for (let i=0;i<4;i++) {
  //   console.log(result.Contact[i].EmailAddress)
  //   // console.log(EmailAddress);
  // }
  // let invoices = result.Invoices.Date
  // console.log(invoices);


  // const result2 = await xero.invoices.get();
  // console.log(result2.invoices[1].Contact.Name)

})();

// app.get('/invoices', async function(req, res) {
//     authorizedOperation(req, res, '/invoices', function(xeroClient) {
//         xeroClient.invoices.get()
//             .then(function(result) {
//                 res.render('invoices', {
//                     invoices: result.Invoices,
//                     active: {
//                         invoices: true,
//                         nav: {
//                             accounting: true
//                         }
//                     }
//                 });
//             })
//             .catch(function(err) {
//                 handleErr(err, req, res, 'invoices');
//             })
//
//     })
// });
//
// app.get('/repeatinginvoices', async function(req, res) {
//     authorizedOperation(req, res, '/repeatinginvoices', function(xeroClient) {
//         xeroClient.repeatingInvoices.get()
//             .then(function(result) {
//                 res.render('repeatinginvoices', {
//                     repeatinginvoices: result.RepeatingInvoices,
//                     active: {
//                         repeatinginvoices: true,
//                         nav: {
//                             accounting: true
//                         }
//                     }
//                 });
//             })
//             .catch(function(err) {
//                 handleErr(err, req, res, 'repeatinginvoices');
//             })
//
//     })
// });
