const XeroClient = require("xero-node").AccountingAPIClient;

const config = {
  "appType" : "private",
  "consumerKey": "QLZID0Y6ZBSLNJUPWHS1EBTOTEMTDN",
  "consumerSecret": "SQLYDEMPXDYRW66W7YSCKDD28GYBJB",
  "privateKeyPath": "/Users/shahranirahiman/Projects/GA_Projects/takerbiker.github.io/Bears_Dashboard/privatekey.pem"
};


(async function() {
  let xero = new XeroClient(config);

  // await xero.contacts.create({
  //   Name: "Shahrani"
  // })

  const result = await xero.contacts.get();
  console.log(result.Contacts.Name)
})();

app.get('/invoices', async function(req, res) {
    authorizedOperation(req, res, '/invoices', function(xeroClient) {
        xeroClient.invoices.get()
            .then(function(result) {
                res.render('invoices', {
                    invoices: result.Invoices,
                    active: {
                        invoices: true,
                        nav: {
                            accounting: true
                        }
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'invoices');
            })

    })
});

app.get('/repeatinginvoices', async function(req, res) {
    authorizedOperation(req, res, '/repeatinginvoices', function(xeroClient) {
        xeroClient.repeatingInvoices.get()
            .then(function(result) {
                res.render('repeatinginvoices', {
                    repeatinginvoices: result.RepeatingInvoices,
                    active: {
                        repeatinginvoices: true,
                        nav: {
                            accounting: true
                        }
                    }
                });
            })
            .catch(function(err) {
                handleErr(err, req, res, 'repeatinginvoices');
            })

    })
});
