import express from "express";
import bodyParser from "body-parser";
import pkg from 'pg';
import {beds, doctors, medicines} from "./data.js";
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';

dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;
const {Pool} = pkg;

//Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

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
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

// Root endpoint
app.get("/", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({message: "Welcome to the Hospital Management System"});
        } else {
            res.render("index.ejs");
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Fetch and display OPD appointments
app.get('/appointments', async (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        try {
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
                WHERE a.department = 'OPD'
                ORDER BY status DESC;
            `;

            const result = await pool.query(query);
            const appointments = result.rows;

            appointments.forEach(appointment => {
                appointment['Old/New'] = appointment['Appointment Count'] > 1 ? 'Old' : 'New';
            });

            const isPostmanRequest = Boolean(req.headers["postman-token"]);
            if (isPostmanRequest) {
                res.json({appointments, title: "OPD Appointments", URL: "/appointments"});
            } else {
                res.render('opd.ejs', {appointments, title: "OPD Appointments", URL: "/appointments"});
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
            res.status(500).send('Error fetching appointments');
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// New appointment page
app.get("/new", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({doctors, message: "New Appointment Form Data"});
        } else {
            res.render("newappointment.ejs", {doctors});
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Inventory page
app.get("/inventory", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({medicines, title: "Inventory Management"});
        } else {
            res.render("inventory.ejs", {medicines});
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// IPD page
app.get('/ipd', async (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        try {
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
                WHERE a.department = 'IPD'
                ORDER BY status DESC;
            `;

            const result = await pool.query(query);
            const appointments = result.rows;

            appointments.forEach(appointment => {
                appointment['Old/New'] = appointment['Appointment Count'] > 1 ? 'Old' : 'New';
            });

            const isPostmanRequest = Boolean(req.headers["postman-token"]);
            if (isPostmanRequest) {
                res.json({appointments, title: "IPD Appointments", URL: "/ipd"});
            } else {
                res.render('opd.ejs', {appointments, title: "IPD", URL: "ipd"});
            }
        } catch (err) {
            console.error('Error fetching IPD appointments:', err);
            res.status(500).send('Error fetching IPD appointments');
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Staff page
app.get("/staff", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({message: "Staff page under construction"});
        } else {
            res.send("UNDER CONSTRUCTION");
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Patients page
app.get("/patients", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({message: "Patients page under construction"});
        } else {
            res.send("UNDER CONSTRUCTION");
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Beds page
app.get("/beds", (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const isPostmanRequest = Boolean(req.headers["postman-token"]);
        if (isPostmanRequest) {
            res.json({beds, title: "Bed Allocation"});
        } else {
            res.render("bedallocation.ejs", {beds});
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Handle new appointment creation
app.post("/new", async (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
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
            const checkPatientQuery = `
                SELECT patient_id 
                FROM patients 
                WHERE LOWER(name) = LOWER($1) AND phone = $2;
            `;
            const patientResult = await pool.query(checkPatientQuery, [name, phone]);

            let patient_id;

            if (patientResult.rows.length > 0) {
                patient_id = patientResult.rows[0].patient_id;
            } else {
                const insertPatientQuery = `
                    INSERT INTO patients (name, gender, blood_group, phone, email, emergency_contact_name, emergency_contact_number,
                                          date_of_birth, occupation, address, allergies, current_medication, family_medical_history,
                                          past_medical_history, insurance_type, referred_by)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                    RETURNING patient_id;
                `;
                const insertPatientResult = await pool.query(insertPatientQuery, [
                    name, gender, bloodGroup, phone, email, emergencyContactName, emergencyContactNumber,
                    dateOfBirth, occupation, address, allergies, currentMedication, familyMedicalHistory,
                    pastMedicalHistory, insuranceType, referredBy
                ]);

                patient_id = insertPatientResult.rows[0].patient_id;
            }

            const insertAppointmentQuery = `
                INSERT INTO appointments (patient_id, doctor_name, date_of_appointment, time_of_appointment, payment, status)
                VALUES ($1, $2, $3, $4, $5, $6);
            `;
            await pool.query(insertAppointmentQuery, [
                patient_id, doctorName, dateOfAppointment, timeOfAppointment, 'Unpaid', 'Pending'
            ]);

            const isPostmanRequest = Boolean(req.headers["postman-token"]);
            if (isPostmanRequest) {
                res.status(201).json({
                    message: "Appointment successfully created!",
                    patient_id,
                    doctorName,
                    dateOfAppointment,
                    timeOfAppointment
                });
            } else {
                res.redirect("/appointments");
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            res.status(500).json({message: "Error creating appointment."});
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Update appointment status
app.post('/appointments/updateStatus', async (req, res) => {
    if (req.isAuthenticated() || req.headers["postman-test-secret"] === "iLovePostman") {
        const {appointment_id, status} = req.body;

        try {
            const query = `
                UPDATE appointments
                SET status = $1
                WHERE appointment_id = $2 AND department = 'OPD'
                RETURNING *;
            `;

            const result = await pool.query(query, [status, appointment_id]);

            if (result.rowCount === 0) {
                return res.status(404).send('Appointment not found.');
            }

            const isPostmanRequest = Boolean(req.headers["postman-token"]);
            if (isPostmanRequest) {
                res.json({
                    message: "Status updated successfully",
                    appointment: result.rows[0]
                });
            } else {
                res.redirect('/appointments');
            }
        } catch (err) {
            console.error('Error updating status:', err);
            res.status(500).send('An error occurred while updating the status.');
        }
    } else {
        if (req.headers["postman-token"]) {
            res.status(401).send("Postman client could not be authenticated. Please use the correct postman-test-secret header.");
        } else {
            res.redirect("/login");
        }
    }
});

// Authentication routes
app.get("/login", (req, res) => {
    res.render('login.ejs');
});

app.get("/auth/google", passport.authenticate('google', {
    scope: ["profile", "email"]
}));

app.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect: "/login",
    successRedirect: "/"
}));

app.get("/test", (req, res) => {
    res.send(req.query);
});

app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/login");
    });
});

app.get("*", (req, res) => {
    res.redirect("/");
})
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
