import express from "express";
import bodyParser from "body-parser";
import {Pool} from 'pg';
import {appointments, beds, doctors, medicines} from "./data.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;

// Initialize Supabase (PostgreSQL) connection pool
const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Render the index page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Fetch appointments from the database
app.get('/appointments', async (req, res) => {
    try {
        // Query to fetch data from patients and appointments tables
        const query = `
            SELECT 
                p.id AS "Patient ID", 
                p.name AS "Name", 
                p.gender AS "Gender", 
                p.dob AS "Date of Birth", 
                a.time_of_appointment AS "Time",
                a.payment AS "Payment",
                a.status AS "Status",
                a.doctor_name AS "Doctor Name",
                CASE 
                    WHEN p.dob < CURRENT_DATE - INTERVAL '18 years' THEN 'Old'
                    ELSE 'New'
                END AS "Old/New"
            FROM patients p
            JOIN appointments a ON p.id = a.patient_id
            ORDER BY a.time_of_appointment DESC;
        `;

        // Execute the query to fetch appointments
        const result = await pool.query(query);
        const appointmentsData = result.rows;

        // Send the data to the EJS template
        res.render('opd', {appointments: appointmentsData});
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).send('Error fetching appointments');
    }
});

// Render the page to create a new appointment
app.get("/new", (req, res) => {
    res.render("newappointment.ejs", {doctors});
});

// Render the inventory page
app.get("/inventory", (req, res) => {
    res.render("inventory.ejs", {medicines});
});

// Render the IPD page
app.get("/ipd", (req, res) => {
    res.render("ipd.ejs", {appointments});
});

// Staff page (under construction)
app.get("/staff", (req, res) => {
    res.send("UNDER CONSTRUCTION");
});

// Patients page (under construction)
app.get("/patients", (req, res) => {
    res.send("UNDER CONSTRUCTION");
});

// Render the bed allocation page
app.get("/beds", (req, res) => {
    res.render("bedallocation.ejs", {beds});
});

// Handle the new appointment POST request
app.post("/new", (req, res) => {
    res.json(req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
