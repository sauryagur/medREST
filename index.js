import express from "express";
import bodyParser from "body-parser";

import {appointments, beds, medicines} from "./data.js";


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/appointments", (req, res) => {
    res.render("opd.ejs", {appointments: appointments});
});

app.get("/inventory", (req, res) => {
    res.render("inventory.ejs", {medicines: medicines});
});

app.get("/ipd", (req, res) => {
    res.render("ipd.ejs", {appointments: appointments});
});

app.get("/staff", (req, res) => {
    res.send("UNDER CONSTRUCTION");
});

app.get("/patients", (req, res) => {
    res.send("UNDER CONSTRUCTION");
});


app.get("/beds", (req, res) => {
    res.render("bedallocation.ejs", {beds: beds});
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
