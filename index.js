const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");

const homeRouter = require("./routes/home");
const carsRouter = require("./routes/cars");
const addRouter = require("./routes/add");
const cardRouter = require("./routes/card");

const hbs = exhbs.create({defaultLayout: "main", extname: "hbs"});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);
app.use('/cars', carsRouter);
app.use('/create', addRouter);
app.use("/card", cardRouter);

async function start() {
    try {
        const dbUrl = "mongodb+srv://Stiles:nodeAlpha1999truealpha@clustertesla.cxdrzdv.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(dbUrl);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {console.log(`Server started at Port ${PORT}...`)})
    } catch(err) {
        console.log(err)
    }
}

start();





