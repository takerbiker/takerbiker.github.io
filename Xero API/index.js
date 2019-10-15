const XeroClient = require("xero-node").AccountingAPIClient;

const config = {
  "appType" : "private",
  "consumerKey": "QLZID0Y6ZBSLNJUPWHS1EBTOTEMTDN",
  "consumerSecret": "SQLYDEMPXDYRW66W7YSCKDD28GYBJB",
  "privateKeyPath": "/Users/shahranirahiman/Desktop/Bears_Dashboard/privatekey.pem"
};

(async function() {
  let xero = new XeroClient(config);

  await xero.contacts.create({
    Name: "Phil"
  })

  const result = await xero.contacts.get();
  console.log(result.Contacts[0]);
})();
