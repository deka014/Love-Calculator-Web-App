var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs")

app.use(express.static(__dirname+"/public")); 

app.get("/",function(req,res){
	res.render("homepage")
})


app.get("/results",function(req,res){
	
	 var fname = capitalize(req.query.first) ;
	 var sname = capitalize(req.query.second);
	 var options = {
  	 url: 'https://love-calculator.p.rapidapi.com/getPercentage',
	 qs: {fname: fname , sname: sname },
 	 headers: {
    'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
    'x-rapidapi-key': '<revoked Api key>'
   		 }
				  };

	
	request(options, function (error, response, body) {
	 	var data = JSON.parse(body);
		if (error){
		console.log(error);
	}	else{
	    res.render("results",{data : data });
		console.log(fname,sname);
		// console.log(data1)
		// console.log(req.headers)
	}
});
})

app.get("/creator", function(req,res ){
	res.render("credits");
})

function capitalize(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}



 
app.listen(3000 ,function(){
	console.log("Server ONLINE")
});