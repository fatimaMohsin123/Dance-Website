const express = require("express");
const app = express();
const port = 80;
const path = require("path");
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.set("strictQuery", false);
// require('dotenv').config({ path: 'ENV_FILENAME' });
// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });
mongoose.connect('mongodb://mongo_db:27017/contactDance', { useNewUrlParser: true });
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String
});
const Contact = mongoose.model('Contact', contactSchema);
// For serving static files
// EXPRESS
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//END-POINTS
app.get("/", (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});
//Post request
app.post("/contact", (req, res) => {
    var data = new Contact(req.body);
    data.save().then(() => {
        res.send("The data has been saved to the database");
    }).catch(() => {
        res.status(400).send("The data has not been saved to the database");
    });
    // res.status(200).render('contact.pug');
});

//SERVER START
app.listen(port, () => {
    console.log("The application started on port: " + port);
});