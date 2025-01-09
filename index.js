import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy} from "passport-local";
import session from "express-session";
import env from "dotenv";

import {appointments} from "./data.js";
import {beds} from "./data.js";


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
    res.render("inventory.ejs");
});

app.get("/ipd", (req, res) => {
    res.render("ipd.ejs", {appointments: appointments});
});

app.get("/beds", (req, res) => {
    res.render("bedallocation.ejs", {beds: beds});
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
