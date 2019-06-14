//jshint esversion: 6
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();



// 바디파서 사용 
app.use(bodyParser.urlencoded({extended: true}));

// 위치, 콜백
app.get("/", function(req,res){
  // res.send("<h1>Hello, world!</h1>");
  res.sendFile(__dirname + "/index.html");
});

// var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD"

app.post("/",function(req,res){

	// crypto 가 name 
	var whichCoin = req.body.crypto;
	var whichCurrency = req.body.fiat;
	var amount = req.body.amount;

	// var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

	// var finalURL = baseURL + whichCoin + whichCurrency;

	var options = {
		url: "https://apiv2.bitcoinaverage.com/indices/global/ticker/", // baseUrl
		method: "GET",
		qs: {
			from: whichCoin,
			to: whichCurrency,
			amount:
		}
	}

	// console.log(req.body.crypto);
	// 참조 
	// https://www.npmjs.com/package/request
	// request 를 보낼때 
	request(options, function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.
	  // console.log(body);
	  var data = JSON.parse(body);
	  var price = data.averages.week;
	  console.log(price);

	  var currentDate = data.display_timestamp;

	  // 응답을 보내는 것은 한번만
	  // write 로 작성한뒤 보낸다.
	  res.write("<p>The current date is " + currentDate + "</p>");

	  res.write("<h1>The current price of " + whichCoin +" is " + price + " " + whichCurrency +"</h1>");

	  res.send();

	});
	
});



app.listen(3000,function(){
	console.log("server just started on port 3000");
});

