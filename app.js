const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://kaushtuk:KIuC4kgcL0CCyjVH@cluster0-rp6gv.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.get('/', (req, res) => {
    //res.send('hello world');
    res.sendFile('public/index.html', {root: __dirname});
});

app.get('/login', (req, res) => {
    res.sendFile('public/login.html', {root: __dirname});
    //res.send('hello world');
});

app.get('/signup', (req, res) => {
    res.sendFile('public/signup.html', {root: __dirname});
    //res.send('hello world');
});

function validatePasswordStrength(passw) {
    console.log(passw);
    var reg = /\w*/g;
    var largeCase = passw.search(/[A-Z]/g);
    var smallCase = passw.search(/[a-z]/g);
    var numericChar = passw.search(/[0-9]/g);
    var specialChar = passw.search(/[^a-zA-Z0-9]/g);

    if (smallCase == -1) {
        return 'Small-case character is required';
    }
    if (largeCase == -1) {
        return 'Large-case character is required';
    }
    if (numericChar == -1) {
        return 'Numeric character is required';
    }
    if (specialChar == -1) {
        return 'Special character is required';
    }
}

app.post('/validatePassword', (req, res) => {
    console.log(req.body);
    res.send(validatePasswordStrength(req.body.password));
});

var port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
})