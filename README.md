# medREST

A comprehensive hospital management system built with Node.js, Express, and PostgreSQL. The system manages
appointments (OPD/IPD), inventory, bed allocation, and includes Google OAuth authentication.

Made by Saurya Gur, Jaiveer Singh, Jatin Garg and Baltej Singh for BITS Pilani Postman API Hackathon 4.0.

## Features

- 🏥 OPD and IPD appointment management
- 🛏️ Bed allocation system
- 💊 Inventory management
- 🔐 Google OAuth authentication
- 📊 Patient history tracking
- 🔍 Postman API testing support

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (or Supabase)
- Google Cloud Console account for OAuth
- npm or yarn package manager

## Database Setup

1. Create a PostgreSQL database or setup a Supabase project
2. Create the following tables:

```sql
-- Patients table
CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(20),
    blood_group VARCHAR(5),
    phone VARCHAR(15),
    email VARCHAR(100),
    emergency_contact_name VARCHAR(100),
    emergency_contact_number VARCHAR(15),
    date_of_birth DATE,
    occupation VARCHAR(100),
    address TEXT,
    allergies TEXT,
    current_medication TEXT,
    family_medical_history TEXT,
    past_medical_history TEXT,
    insurance_type VARCHAR(50),
    referred_by VARCHAR(100)
);

-- Appointments table
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    doctor_name VARCHAR(100),
    date_of_appointment DATE,
    time_of_appointment TIME,
    department VARCHAR(10) DEFAULT 'OPD',
    payment VARCHAR(20) DEFAULT 'Unpaid',
    status VARCHAR(20) DEFAULT 'Pending'
);
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_DB_URL=your_database_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hospital-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables as described above.

4. Start the server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── public/             # Static files
├── views/             # EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── opd.ejs
│   ├── inventory.ejs
│   ├── newappointment.ejs
│   └── bedallocation.ejs
├── data.js            # Static data (doctors, beds, medicines)
├── package.json
└── server.js          # Main application file
```

## API Testing with Postman

The application includes special support for API testing with Postman. To authenticate Postman requests:

1. Add the header: `postman-test-secret: iLovePostman`(or simply import [this](https://github.com/TeamWOMM/medREST_postman/blob/main/medREST%20API%20Testing%20with%20Postman.json) file into Postman collections)
2. All protected endpoints will return JSON responses when accessed via Postman

Available endpoints:

- GET `/appointments` - List OPD appointments
- GET `/ipd` - List IPD appointments
- GET `/inventory` - View inventory
- GET `/beds` - View bed allocation
- POST `/new` - Create new appointment
- POST `/appointments/updateStatus` - Update appointment status

## Authentication

The system uses Google OAuth 2.0 for authentication. To set it up:

1. Go to Google Cloud Console
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
6. Copy the client ID and secret to your `.env` file

## License

Made by Saurya Gur, Jaiveer Singh, Jatin Garg and Baltej Singh for BITS Pilani Postman API Hackathon 4.0.