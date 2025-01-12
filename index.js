import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
import {beds, doctors, medicines} from "./data.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;
const {Pool} = pkg;

// Initialize Supabase (PostgreSQL) connection pool
const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL, ssl: {
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
        // Query to fetch data from patients and appointments tables, filtering for OPD department
        const query = `
    SELECT 
        a.appointment_id AS id,
        p.patient_id AS "Patient ID", 
        p.name AS "Name", 
        p.gender AS "Gender", 
        p.date_of_birth AS "Date of Birth",
        TO_CHAR(a.date_of_appointment, 'DD/MM/YYYY') AS "Date",
        a.time_of_appointment AS "Time",
        a.payment AS "Payment",
        a.status AS "Status",
        a.doctor_name AS "Doctor Name",
        COUNT(a.patient_id) OVER (PARTITION BY a.patient_id) AS "Appointment Count"
    FROM patients p
    JOIN appointments a ON p.patient_id = a.patient_id
    WHERE a.department = 'OPD'  -- Filter for OPD department
    ORDER BY status DESC;
`;

        // Execute the query to fetch appointments
        const result = await pool.query(query);
        const appointments = result.rows;

        // Add "Old/New" status based on the number of appointments
        appointments.forEach(appointment => {
            appointment['Old/New'] = appointment['Appointment Count'] > 1 ? 'Old' : 'New';
        });

        // Send the data to the EJS template
        res.render('opd.ejs', {appointments, title: "OPD Appointments", URL: "/appointments"});
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

app.get('/ipd', async (req, res) => {
    try {
        // Query to fetch data from patients and appointments tables, filtering for IPD department
        const query = `
        SELECT 
            a.appointment_id AS id,
            p.patient_id AS "Patient ID", 
            p.name AS "Name", 
            p.gender AS "Gender", 
            p.date_of_birth AS "Date of Birth",
            TO_CHAR(a.date_of_appointment, 'DD/MM/YYYY') AS "Date",
            a.time_of_appointment AS "Time",
            a.payment AS "Payment",
            a.status AS "Status",
            a.doctor_name AS "Doctor Name",
            COUNT(a.patient_id) OVER (PARTITION BY a.patient_id) AS "Appointment Count"
        FROM patients p
        JOIN appointments a ON p.patient_id = a.patient_id
        WHERE a.department = 'IPD'  -- Filter for IPD department
        ORDER BY status DESC;
        `;

        // Execute the query to fetch appointments
        const result = await pool.query(query);
        const appointments = result.rows;

        // Add "Old/New" status based on the number of appointments
        appointments.forEach(appointment => {
            appointment['Old/New'] = appointment['Appointment Count'] > 1 ? 'Old' : 'New';
        });

        // Send the data to the EJS template
        res.render('opd.ejs', {appointments, title: "IPD", URL: "ipd"});
    } catch (err) {
        console.error('Error fetching IPD appointments:', err);
        res.status(500).send('Error fetching IPD appointments');
    }
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
app.post("/new", async (req, res) => {
    const {
        name,
        gender,
        bloodGroup,
        phone,
        email,
        emergencyContactName,
        emergencyContactNumber,
        dateOfBirth,
        occupation,
        address,
        allergies,
        currentMedication,
        familyMedicalHistory,
        pastMedicalHistory,
        insuranceType,
        referredBy,
        doctorName,
        dateOfAppointment,
        timeOfAppointment
    } = req.body;

    try {
        // Step 1: Check if the patient already exists in the database (using lowercase(name) and phone for uniqueness)
        const checkPatientQuery = `
            SELECT patient_id 
            FROM patients 
            WHERE LOWER(name) = LOWER($1) AND phone = $2;
        `;
        const patientResult = await pool.query(checkPatientQuery, [name, phone]);

        let patient_id;

        if (patientResult.rows.length > 0) {
            // Patient exists, use the existing patient_id
            patient_id = patientResult.rows[0].patient_id;
        } else {
            // Step 2: If patient does not exist, insert a new patient into the database
            const insertPatientQuery = `
                INSERT INTO patients (name, gender, blood_group, phone, email, emergency_contact_name, emergency_contact_number,
                                      date_of_birth, occupation, address, allergies, current_medication, family_medical_history,
                                      past_medical_history, insurance_type, referred_by)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                RETURNING patient_id;
            `;
            const insertPatientResult = await pool.query(insertPatientQuery, [name, gender, bloodGroup, phone, email, emergencyContactName, emergencyContactNumber, dateOfBirth, occupation, address, allergies, currentMedication, familyMedicalHistory, pastMedicalHistory, insuranceType, referredBy]);

            patient_id = insertPatientResult.rows[0].patient_id;
        }

        // Step 3: Insert the new appointment into the appointments table
        const insertAppointmentQuery = `
            INSERT INTO appointments (patient_id, doctor_name, date_of_appointment, time_of_appointment, payment, status)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        await supabase.query(insertAppointmentQuery, [patient_id, doctorName, dateOfAppointment, timeOfAppointment, 'Unpaid', 'Pending']);

        res.status(201).json({
            message: "Appointment successfully created!", patient_id, doctorName, dateOfAppointment, timeOfAppointment
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({message: "Error creating appointment."});
    }
});

// POST route to update appointment status
app.post('/appointments/updateStatus', async (req, res) => {
    const {appointment_id, status} = req.body;

    try {
        // Update the status of the appointment in the database
        const query = `
            UPDATE appointments
            SET status = $1
            WHERE appointment_id = $2 AND department = 'OPD'
            RETURNING *
        `;

        // Execute the query to update the status
        const result = await pool.query(query, [status, appointment_id]);

        if (result.rowCount === 0) {
            return res.status(404).send('Appointment not found.');
        }

        // Redirect back to the appointments page after updating the status
        res.redirect('/appointments');
    } catch (err) {
        // Log the error and send an error message
        console.error('Error updating status:', err);
        res.status(500).send('An error occurred while updating the status.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
