import express from "express";
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js';
import {appointments, beds, medicines, doctors} from "./data.js";


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/appointments", async (req, res) => {
    try {
        // Fetch data from the "patients" table
        const { data: patients, error: patientError } = await supabase
            .from('patients')
            .select('*'); // Adjust fields if needed

        if (patientError) {
            throw patientError;
        }

        // Fetch data from the "appointments" table
        const { data: appointments, error: appointmentError } = await supabase
            .from('appointments')
            .select('*, patients(*)'); // Join with the "patients" table

        if (appointmentError) {
            throw appointmentError;
        }

        // Merge patient data into appointments
        const appointmentsWithPatients = appointments.map(appointment => {
            const patient = patients.find(p => p.id === appointment.patient_id); // Match patient_id from appointments to patients
            return {
                ...appointment,
                ...patient, // Merge patient data into the appointment object
            };
        });

        // Render the EJS template with the merged data
        res.render("opd.ejs", { appointments: appointmentsWithPatients });
    } catch (error) {
        console.error('Error fetching data from Supabase:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/new", (req, res) => {
    res.render("newappointment.ejs", {doctors: doctors});
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


app.post("/new", (req, res) => {
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
