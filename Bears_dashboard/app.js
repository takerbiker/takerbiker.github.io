console.log($("Working yo"));

$(() => {

//////////////////////////////CREATE TABLE FUNCTIONS//////////////////////////////
  //Function to create table to display Amount customer has spent
  const $createCustomerSpentTable = () => {

    $(".tableOutput").css("display","block");
    //Title
    const $title = $("<h2>").text("Customer Lifetime Value").addClass("textCenter title");
    $(".tableOutput").prepend($title);

    //Create tableheader on click
    $(".tableHeader").append($("<th>Name</th>"));
    $(".tableHeader").append($("<th>Amount (S$)</th>"));

    for (let i=0;i<=data.length-1;i++) {

      // Create row
      $("<tr>").appendTo($(".tableBody"));

      //Customer Name
      let $customerName = $("<td>" + data[i].Contact.Name + "</td>");
      $(".tableBody").append($customerName);

      //To push into customers Name array
      // customerNameArray.push(data[i].Contact.Name);
      // console.log(customerNameArray);

      //Amount customer spent
      let $customerAmt = $("<td>" + data[i].AmountPaid + "</td>");
      $(".tableBody").append($customerAmt);

      //To push into customer amount spent array
      // customerAmountArray.push(data[i].AmountPaid);
      // console.log(customerAmountArray);

    }
  } //end of createTableFunction

  //Function to create table to display Customer Contact details
  const $createCustomerContacts = () => {

    $(".tableOutput").css("display","block");

    //Title for table
    const $title = $("<h2>").text("Customer Contact List").addClass("textCenter title");
    $(".tableOutput").prepend($title);

    $("table").addClass("customerContacts");
    //Create tableheader on click
    $(".tableHeader").append($("<th>S/N</th>"));
    $(".tableHeader").append($("<th>Name</th>"));
    $(".tableHeader").append($("<th>Email</th>"));
    $(".tableHeader").append($("<th>Contact</th>"));

    // const dataContacts = customerContacts.Contacts;

    for (let i=0;i<=dataContacts.length-1;i++) {

      //Create table row
      $("<tr>").appendTo($(".tableBody"));
      //#
      $("<td>" + (i+1) + "</td>").appendTo($(".tableBody"));

      //Customer Name
      let $customerName = $("<td>" + dataContacts[i].Name + "</td>");
      $(".tableBody").append($customerName);

      //Customer Email
      let $customerEmail = $("<td>" + dataContacts[i].EmailAddress + "</td>");
      $(".tableBody").append($customerEmail);

      //Customer Contact
      let $customerContact = $("<td>" + dataContacts[i].Phones[1].PhoneNumber + "</td>");
      $(".tableBody").append($customerContact);


    }
  } //end of createTableFunction

  //Function to create table to show insurance Customer details
  const $createInsuranceHistoryTable = () => {

    $(".tableOutput").css("display","block");

    // Insurance History Title
    const $title = $("<h2>").text("Insurance Payout Schedule").addClass("textCenter title");
    $(".tableOutput").prepend($title);

    //ADD CLASS
    $("table").addClass("insuranceHistory");

    //Create tableheader on click
    $(".tableHeader").append($("<th>Date</th>"));
    $(".tableHeader").append($("<th>Amount (S$)</th>"));

    for (let i=0;i<=data.length-1;i++) {

      if (data[i].Contact.Name === "Projex v2d") {

        //Create table row
        $("<tr>").appendTo($(".tableBody"));

        //Print Date String
        let $dateClaim = $("<td>" + data[i].DateString + "</td>");
        $(".tableBody").append($dateClaim);
        // console.log($dateClaim);

        //Insurance Amount paid
        let $insuranceAmount = $("<td>" + data[i].AmountPaid + "</td>");
        $(".tableBody").append($insuranceAmount);
        // console.log($insuranceAmount);

      } //End of else if statement
    } //End of for loop
  } //end of createTableFunction


  //////////////////////////////CHART GRAPH//////////////////////////////
  const chartColors = ["#007bff","#28a745","#333333","#c3e6cb","#dc3545","#6c757d", "#FE5C5C"];

  let $lineChart = $("#lineChart");

  //Chart data
  let chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September"],
    datasets: [{
      //Costs
      data: [27764, 24120, 20105, 20161, 20150, 21200, 22010, 19150, 22350],
      backgroundColor: "transparent",
      borderColor: chartColors[6],
      borderWidth: 4,
      pointBackgroundColor: chartColors[0]
    },
    {
      // Revenue
      data: [19755, 21928.7, 19638.5, 18514.5, 22256, 16879, 22785.1, 20513, 30103],
      backgroundColor: chartColors[3],
      borderColor: chartColors[0],
      borderWidth: 4,
      pointBackgroundColor: chartColors[1]
    }]
  };

  //Create chart function for summary. I can pull my data to put it here!
  const $createChartOverview = () => {
    if ($lineChart) {
      new Chart($lineChart, {
        type: 'line',
        data: chartData,
        options: {
          title: {
            text: "Summary",
            display: true,
            fontSize: 24,
            fontFamily: "helvetica",
            padding: 10,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      });
    }
  }
  $createChartOverview();


  //////////////////////////////INSURANCE PREMIUM CALCULATOR SECTION//////////////////////////////
  let points=11;
  let premium;

  //Brands and models
  const vehicleBrandModel = () => {
      const inputValue = $("#brand").val();
      if (inputValue.toLowerCase() === "yamaha") {
        points += 14.5;
        //Can add for honda superfour, honda sp,
      } else if (inputValue.toLowerCase() === "honda") {
        points += 17;
      } else if (inputValue.toLowerCase() === "vespa") {
        points += 18;
        //can add for Y125, others, rxz, rxk
      }
    }

  //Check age
  const checkAge = () => {


  // Age conditional depending on answer
  const inputValue = $("#age").val();
  // console.log(inputValue);
      if (inputValue <= 21) {
        points += 41;
      } else if (inputValue <=23 ) {
        points += 29;
      } else if (inputValue === 24) {
        points += 24.5;
      } else if (inputValue === 25) {
        points += 19;
      } else if (inputValue <= 27 ) {
        points += 13.5;
      } else if (inputValue <= 30 ) {
        points += 8;
      } else if (inputValue <= 32 ) {
        points += 6;
      } else if (inputValue <= 35 ) {
        points += 4;
      } else if (inputValue <= 40 ) {
        points -= 2;
      } else if (inputValue >40) {
        points += 2;
      }
      }

  //Check engine capacity
  const checkCapacity = () => {

      const inputValue = $("#capacity").val();

      if (inputValue <= 125) {
        points += 7;
      } else if (inputValue <= 200 ) {
        points += 10;
      } else if (inputValue <= 400 ) {
        points += 16;
      } else if (inputValue <=750 ) {
        points += 26;
      } else if (inputValue > 750) {
        points += 35;
      }
    }

  //Type of insurance
  const checkTypeOfInsurance = () => {

      const inputValue = $("#insurance").val();

      if (inputValue.toLowerCase() === "comprehensive") {
        points += 54;
      } else if (inputValue.toLowerCase()  === "tpft") {
        points += 39;
      } else if (inputValue.toLowerCase() === "third party") {
        points += 25;
      }
    }

  //Check claim experience. Still need to include the other columns
  const checkClaimExperience = () => {

      const inputValue = $("#claims").val();

      if (inputValue <= 10000) {
        points+=0;
      } else if ((inputValue > 10000) && (inputValue <=20000)) {
        points += 25;
      } else if (inputValue > 20000) {
        return("Will have to check with underwriter");
      }
    }

  //Riding experience
  const ridingExperience = () => {

      const inputValue = $("#experience").val();

      if (inputValue < 2) {
        points += 13.5;
      } else if (inputValue >= 2) {
        points += 0;
      }

    }

  //check premium cost for NTUC. Can work on it by specifying each point
  const checkPremium = (x) => {
      switch (true) {
        case (x <= 60):
        premium = 159.91;
        console.log("If you choose NTUC, your premium is $159.91");
        break;
        case (x <= 90):
        premium = 388.16;
        console.log("If you choose NTUC, your premium is $388.16");
        break;
        case (x <= 120):
        premium = 942.16;
        console.log("If you choose NTUC, your premium is $942.16");
        break;
        case (x <= 150):
        premium = 2286.86;
        console.log("If you choose NTUC, your premium is $2286.86");
        break;
        case (x <= 180):
        premium = 5550.81;
        console.log("If you choose NTUC, your premium is $5550.81");
        break;
        case (x <= 210):
        premium = 13473.26;
        console.log("If you choose NTUC, your premium is $13473.26");
        break;
        default:
        console.log("Error, please try again!");
      }
    }

  //Check cost for NTUC. Can include other companies next time!
  const checkNtuc = () => {
      checkAge();
      checkCapacity();
      checkTypeOfInsurance();
      checkClaimExperience();
      ridingExperience();
      vehicleBrandModel();
      checkPremium(points);
    };

  //Reset Points for insurance prem calculation
  const pointsReset = () => {
    points = 11;
  }


//////////////////////////////BUTTONS//////////////////////////////
  //TO CLEAR DISPLAY
  const clearDisplay = () => {
    $("#lineChart").hide();
    $(".frontpage").hide();
    $(".tableBody").empty();
    $(".tableHeader").empty();
    $(".title").remove();
  }

  //Customer lifetime Value spent button
  $(".customerSpentBtn").on("click", () => {
    clearDisplay();
    $("table").removeClass("customerContacts insuranceHistory");
    $(".insurance").css("display","none");
    $createCustomerSpentTable();
  });

  // Customer contacts
  $(".getCustomerContacts").on("click", () => {
    clearDisplay();
    $("table").removeClass("customerSpent insuranceHistory");
    $(".insurance").css("display","none");
    $createCustomerContacts();
  });

  // Insurance history
  $(".insuranceHistoryBtn").on("click", () => {
    clearDisplay();
    $("table").removeClass("customerContacts customerSpent");
    $(".insurance").css("display","none");
    $createInsuranceHistoryTable();
  });

  // Premium calculator
  $(".premiumCalculator").on("click", () => {
    clearDisplay();
    $(".tableOutput").hide();
    $("table").removeClass("customerContacts customerSpent");
    $(".insurance").css("display","block");
  });

  // SEARCH BAR & BUTTON
  $(".searchBar").on("click", () => {

    let amtSpentArray = [];
    const $searchInput = $("#myInput").val();
    console.log($searchInput);

    //Looping through array to check for search input by user
    for (let i=0; i<=data.length-1; i++) {
      if ($searchInput === data[i].Contact.Name) {
        amtSpentArray.push(data[i].AmountPaid);
        // console.log(data[i].AmountPaid);
      }
    }

    //FIND SUM PERSON HAS PAID
    const $sumAmt = amtSpentArray.reduce((a,b) => (a + b));

    $(".tableBody").empty();

    // Create row
    $("<tr>").appendTo($(".tableBody"));

    //Customer Name
    let $customerName = $("<td>" + $searchInput + "</td>");
    $(".tableBody").append($customerName);

    //Amount customer spent
    let $customerAmt = $("<td>" + $sumAmt + "</td>");
    $(".tableBody").append($customerAmt);

    //Reset search bar
    $("#myInput").val("");

  });

  //Insurance premium calculator on click
  $(".formSubmit").on("click", () => {
    pointsReset();
    $(".outcome").hide();
    checkNtuc();
    console.log(points);
    const $outcome = $("<div>").addClass("outcome").text("If you choose NTUC, your premium is $" + premium + " per annum.") ;
    $(".card-body").append($outcome);
  });

}) //CLOSING DONT DELETE














////////////////////////////////////////////////////////////CODE GRAVEYARD////////////////////////////////////////////////////////////
// //LOGIC FOR LIFETIME VALUE OF CUSTOMER
//
// let lifeTimeObj = {};
//
// //Creating key in the object
// for (let i=0;i<=allCustomerLifeTimeSpendArray.length-1;i++) {
//   lifeTimeObj[allCustomerLifeTimeSpendArray][0] = null;
// }
//
// //Settling the values
// for (let i=0;i<=allCustomerLifeTimeSpendArray.length-1;i++) {
//   for (key in lifeTimeObj) {
//     if (key === allCustomerLifeTimeSpendArray[i][0]) {
//       lifeTimeObj[key] += allCustomerLifeTimeSpendArray[i][1];
//     }
//   }
// }
//
//
// for (let key in lifeTimeObj) {
//   console.log(key); //For keys
//   console.log(lifeTimeObj[key]); //For values
// }
// const $createCustomerSpentTable = () => {
//   //To create array to store each customer's name and amount spent
//   let eachCustomerLifeTimeSpendArray = [];
//   let allCustomerLifeTimeSpendArray = [];
//
//   $("table").addClass("customerSpent");
//
//   // $(".tableOutput").prepend('<input id="searchBox" class="searchBar" type="text">');
//   //Table title
//   const $title = $("<h2>").text("Lifetime Customer Value").addClass("textCenter title");
//   $(".tableOutput").prepend($title);
//
//   //Create tableheader on click
//   $(".tableHeader").append($("<th>Name</th>"));
//   $(".tableHeader").append($("<th>Amount(S$)</th>"));
//
//   for (let i=0;i<=data.length-1;i++) {
//
//     //To retrieve customer's name
//     let $customerName = data[i].Contact.Name;
//     //To retrieve customer's amount spent
//     let $customerAmt = data[i].AmountPaid;
//
//     //CREATING AN ARRAY OF ARRAYS. EACH ARRAY = Customer, amount he spent
//     eachCustomerLifeTimeSpendArray.push($customerName, $customerAmt);
//     allCustomerLifeTimeSpendArray.push(eachCustomerLifeTimeSpendArray);
//   } //end of for loop
//
//
//   for (let i=0;i<=allCustomerLifeTimeSpendArray.length-1;i++) {
//
//     $("<tr>").appendTo($(".tableBody"));
//     let $customerName = $("<td>" + allCustomerLifeTimeSpendArray[i][0] + "</td>");
//     $(".tableBody").append($customerName);
//
//     let $customerAmt = $("<td>" + allCustomerLifeTimeSpendArray[i][1] + "</td>");
//     $(".tableBody").append($customerAmt);
//   }
