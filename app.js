const express = require("express");


const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get ("/", function (req, res){

    res.sendFile(__dirname + "/signup.html");

});
app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {

        members: [
{

    email_address: email,
    status: "subscribed",
    merge_fields: {
FNAME: firstName,
LNAME: lastName,

    }

}

        ]

    };
    const jsonData =JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/b9f2954c7e";

    const options = {

        method:"POST",
        auth: "vchu23@gmail.com:97e72f86abe88ee712c6e09cad7e58db-us13"
    }
const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
        response.on("data", function(data){

            console.log(JSON.parse(data));

        }
        
        )
    }
    
    
    )

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT, function(){
console.log("server is running on port 8080");
});

// api key 97e72f86abe88ee712c6e09cad7e58db-us13
// list id : b9f2954c7e

// https://stormy-river-50555-cc2b2f8743a8.herokuapp.com/
