var express = require("express");
var app = express();

// When you go to "/"; then you get "Hi There!!!"  req and res are actually objects...req containes all info about the request that was made... res is about what will be responded with
app.get("/", function(req, res) {
   console.log("SOMEONE MADE A REQUEST TO HOMEPAGE..!!")
   res.send("Hi there, Welcome to my website :) !!!");
});

// "/bye" => "Goodbye!!"
app.get("/bye", function(req, res){
   console.log("SOMEONE MADE A REQUEST TO /bye..!!");
   res.send("GoodBye...Have a nice day :)!!");
})

// "/dog" => "MEOW!!"
app.get("/dog", function(req, res){
   console.log("SOMEONE MADE A REQUEST TO /dog..!!");
   res.send("MEOW..!!");
})

// we could use the subreddit idea... where we can welcome user when ever he types "/r/ANYTHING"
app.get("/r/:subredditName", function(req, res){
   var subreddit = req.params.subredditName; // "subredditName" name is exactly same as in above...
   
   console.log("SOMEONE MADE A REQUEST TO '" + subreddit.toUpperCase() + "' Subreddit..!!");
   res.send("WELCOME TO A '" + subreddit.toUpperCase() + "' SUBREDDIT !!");
})

// THIS IS HOW REDDIT USES...
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
   console.log("SOMEONE MADE A REQUEST TO TITLED Subreddit..!!");//params is used to get user input
   console.log(req.params);   //we cannot insert "reg.params" into above console.log... needed to make a second one
   res.send(req.params);
   // res.send("WELCOME TO A TITLED - SUBREDDIT !!");
})









// MUST BE WRITTEN AT THE END of all requests... because ORDER OF ROUTES MATTER!!... "*" assigns what the browser will send if anything other the above assigned is requested....
app.get("*", function(req, res){
   console.log("SOMEONE MADE AN ERROR !!");
   res.send("Please Enter correct URL..!!");
})

// Tell Express to Listen for requests (start server).... We are just asking Cloud9 to use their specific PORT and IP... Else if we used our manually setup environment then just "app.listen(3000)" would have worked
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!!");
});





