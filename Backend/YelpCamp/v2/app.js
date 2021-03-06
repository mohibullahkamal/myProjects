var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose");


// ******* Connect DB *********************************
mongoose.connect("mongodb://localhost/yelp_camp");   //here "yelp_camp" is the db name we create in mongodb...
// ****************************************************
app.use(bodyParser.urlencoded({extended: true}));   //"app.use()"--> helps us to tell ***Express to use "boby-parser"... we also need to ".urlencoded" and pass in an "object-> {}" ... just memorize it... we will be needed it a lot...
app.set("view engine", "ejs");   //no longer ".ejs" extension required when function files in this project


// ******* SCHEMA SETUP-mongoose **********************
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});   //refer to cats.js in Database folder for more details
// ****************************************************


// ******* Compile campground model *******************
var Campground = mongoose.model("Campground", campgroundSchema);   //this where the SCHEMA is turned into a MODEL for later use... MongoDB is using smart libraries to turn the singular word "Campground" to --> "Campgrounds"... check later in database
// ****************************************************


// home page
app.get("/", function(req, res){
    // res.send("this will be the landing page soon...!!");   //used to test server connection... abondoned it for res.render("landing")...
    console.log("User Requested Home page...");
    res.render("landing");
});


// re-direct to "/campground" page... // get all data from DB...
//***(1) INDEX -> RESTful route -> show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});   // [1st-campgrounds] --> renders the "views/campgrounds.ejs" file  //we use {} to indicate all the data that we want to pass... [2nd-campgrounds] --> is refering to the file name "campgrounds.ejs"... [3rd-campgrounds] --> is refering to the "var" named "campgrounds"
        }
    });
});

//***(2) CREATE -> RESTful route -> add new campground to DB
app.post("/campgrounds", function(req, res){   // "app.post()" command is used to post data, as opposed to "app.get()"
    console.log("User Posted on campGround...");
    //res.send("YOU HIT THE POST ROUTE!!");   // lets go test in Postman, whether our App is sending out a post command...
    var name = req.body.name;   //grabbibg data from Form and add to campgrounds array
    var image = req.body.image;   //grabbibg data from Form and add to campgrounds array
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};   //making object to be used by "campground[] array..."
    
    // campgrounds.push(newCampground);   // We will delete this for now... //we push a new "campground" in the "campgrounds[]" array... but we need to push in an Object.. so lets make that Object with "var"... lets call it "newCampgound"... 
    
    //Create a new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");   //after pushing "newCampground"; we need to REDIRECT back to campgrounds page to show user the updated record... yes we have two "/campgrounds" but by default it will use the "app.get("/campgrounds", fun..) request...
        }
    });
});

//***(3) NEW -> RESTful route -> show form to create new campground
app.get("/campgrounds/new", function(req, res){   //RESTful convention of "/campgrounds/new" is followed... This will basically send the data to the "app.post("/campgrounds", function()...)"
   console.log("User Requested Newly Added Data");
   res.render("new");
});

//***(4) SHOW -> RESTful route -> shows info about one dog
app.get("/campgrounds/:id", function(req, res){   //***ORDER of the ROUTE matter... If I switch places to top -> ":id" with "/campgrounds" then the later will not get executed..
    //find campground with provided "id"
    Campground.findById(req.params.id, function(err, foundCampground){    //New method that Mongo gives us... //***"req.params.id" helps us capture the "id"..--> just like we did for the farm animals Projects..MOW, Oink, ... noices....
        if(err){
            console.log(err);
        } else {
            //render show template with that campground 
            res.render("show", {campground: foundCampground});
        }
    });  
});








// // Error page
// app.get("/*", function(req, res){
//   console.log("User Entered wrong URL...!!");
//   res.send("Please Enter Corret URL.");
// });
// Server setup for c9
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started !!!");
});


// *****************************************
// *****************************************



// Campground.create(   //Trying out data entry testing... was successful
//     {
//     name: "green brush",
//     image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
//     description: "This is a huge mountain with stunning scenery. Weather is perfect hiking all year round."
    
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGOUND: ");
//             console.log(campground);
//     }
// });


// //now globally accessesible -> campground array - moved here until later on we migrate to Database...
// var campgrounds = [   // array containing starter Objects... which holds data... later we will relocate these data to a Database...
//         {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Granite Hill", image: "https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Mountain Snow", image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Granite Hill", image: "https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Granite Hill", image: "https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Mountain Snow", image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Granite Hill", image: "https://images.pexels.com/photos/1082316/pexels-photo-1082316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"},
//         {name: "Mountain Snow", image: "https://images.pexels.com/photos/14287/pexels-photo-14287.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"}
//     ];
    
    