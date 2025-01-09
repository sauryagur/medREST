//example data until database integration

export let appointments = [
    {
        'Name': 'Arjun Sharma',
        'Patient ID': '1',
        'Gender': 'Male',
        'Old/New': 'New',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Amit Patel',
        'Time': '2025-01-09 10:00:00',
        'Status': 'Pending'
    },
    {
        'Name': 'Priya Verma',
        'Patient ID': '2',
        'Gender': 'Female',
        'Old/New': 'Old',
        'Payment': 'Unpaid',
        'Doctor Name': 'Dr. Priya Joshi',
        'Time': '2025-01-09 11:30:00',
        'Status': 'Arrived'
    },
    {
        'Name': 'Ravi Kumar',
        'Patient ID': '3',
        'Gender': 'Male',
        'Old/New': 'New',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Ravi Deshmukh',
        'Time': '2025-01-09 14:00:00',
        'Status': 'Workup'
    },
    {
        'Name': 'Neha Singh',
        'Patient ID': '4',
        'Gender': 'Female',
        'Old/New': 'Old',
        'Payment': 'Unpaid',
        'Doctor Name': 'Dr. Neha Agarwal',
        'Time': '2025-01-10 09:00:00',
        'Status': 'In-Progress'
    },
    {
        'Name': 'Vikram Patil',
        'Patient ID': '5',
        'Gender': 'Male',
        'Old/New': 'New',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Vikram Reddy',
        'Time': '2025-01-10 15:00:00',
        'Status': 'Waiting'
    },
    {
        'Name': 'Sneha Reddy',
        'Patient ID': '6',
        'Gender': 'Female',
        'Old/New': 'Old',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Sneha Kapoor',
        'Time': '2025-01-11 13:00:00',
        'Status': 'Discharged'
    },
    {
        'Name': 'Rajesh Gupta',
        'Patient ID': '7',
        'Gender': 'Male',
        'Old/New': 'New',
        'Payment': 'Unpaid',
        'Doctor Name': 'Dr. Rajesh Shukla',
        'Time': '2025-01-11 16:30:00',
        'Status': 'Pending'
    },
    {
        'Name': 'Deepa Mehta',
        'Patient ID': '8',
        'Gender': 'Female',
        'Old/New': 'Old',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Deepa Sharma',
        'Time': '2025-01-12 08:00:00',
        'Status': 'Arrived'
    },
    {
        'Name': 'Anil Kapoor',
        'Patient ID': '9',
        'Gender': 'Male',
        'Old/New': 'New',
        'Payment': 'Unpaid',
        'Doctor Name': 'Dr. Anil Kumar',
        'Time': '2025-01-12 11:00:00',
        'Status': 'Workup'
    },
    {
        'Name': 'Sunita Desai',
        'Patient ID': '10',
        'Gender': 'Female',
        'Old/New': 'Old',
        'Payment': 'Paid',
        'Doctor Name': 'Dr. Sunita Gupta',
        'Time': '2025-01-12 17:00:00',
        'Status': 'In-Progress'
    }
];

export let beds = [
    {
        id: 1,
        name: '101',
        status: 'Occupied',
        patientid: 1
    },
    {
        id: 2,
        name: '102',
        status: 'Empty',
        patientid: null
    },
    {
        id: 3,
        name: '103',
        status: 'Occupied',
        patientid: 2
    },
    {
        id: 4,
        name: '104',
        status: 'Cleaning',
        patientid: null
    },
    {
        id: 5,
        name: '105',
        status: 'Allotted',
        patientid: 3
    },
    {
        id: 6,
        name: '106',
        status: 'Empty',
        patientid: null
    },
    {
        id: 7,
        name: '107',
        status: 'Empty',
        patientid: null
    },
    {
        id: 8,
        name: '108',
        status: 'Empty',
        patientid: null
    },
    {
        id: 9,
        name: '109',
        status: 'Empty',
        patientid: null
    },
    {
        id: 10,
        name: '110',
        status: 'Empty',
        patientid: null
    },
    {
        id: 11,
        name: '111',
        status: 'Occupied',
        patientid: 4
    },
    {
        id: 12,
        name: '112',
        status: 'Empty',
        patientid: null
    },
    {
        id: 13,
        name: '113',
        status: 'Empty',
        patientid: null
    },
    {
        id: 14,
        name: '114',
        status: 'Cleaning',
        patientid: null
    },
    {
        id: 15,
        name: '115',
        status: 'Empty',
        patientid: null
    },
    {
        id: 16,
        name: '116',
        status: 'Empty',
        patientid: null
    },
    {
        id: 17,
        name: '117',
        status: 'Empty',
        patientid: null
    },
    {
        id: 18,
        name: '118',
        status: 'Empty',
        patientid: null
    },
    {
        id: 19,
        name: '119',
        status: 'Empty',
        patientid: null
    },
    {
        id: 20,
        name: '120',
        status: 'Empty',
        patientid: null
    }
];

export let medicines = [
    {
        id: 1,
        name: 'Paracetamol',
        batch_no: 'B1234',
        expiry: '2025-12-31',
        stock: 50,
        purchase_quantity: 100
    },
    {
        id: 2,
        name: 'Ibuprofen',
        batch_no: 'B5678',
        expiry: '2024-05-15',
        stock: 30,
        purchase_quantity: 50
    },
    {
        id: 3,
        name: 'Amoxicillin',
        batch_no: 'B9101',
        expiry: '2024-10-20',
        stock: 0,
        purchase_quantity: 200
    },
    {
        id: 4,
        name: 'Cetirizine',
        batch_no: 'B1121',
        expiry: '2026-03-25',
        stock: 100,
        purchase_quantity: 150
    },
    {
        id: 5,
        name: 'Loratadine',
        batch_no: 'B3141',
        expiry: '2025-08-12',
        stock: 50,
        purchase_quantity: 100
    },
    {
        id: 6,
        name: 'Azithromycin',
        batch_no: 'B5161',
        expiry: '2024-11-30',
        stock: 20,
        purchase_quantity: 60
    },
    {
        id: 7,
        name: 'Metformin',
        batch_no: 'B7181',
        expiry: '2025-07-19',
        stock: 0,
        purchase_quantity: 80
    },
    {
        id: 8,
        name: 'Atorvastatin',
        batch_no: 'B9201',
        expiry: '2025-09-10',
        stock: 25,
        purchase_quantity: 40
    },
    {
        id: 9,
        name: 'Amlodipine',
        batch_no: 'B1222',
        expiry: '2023-12-15',
        stock: 0,
        purchase_quantity: 90
    },
    {
        id: 10,
        name: 'Omeprazole',
        batch_no: 'B3242',
        expiry: '2025-01-01',
        stock: 75,
        purchase_quantity: 120
    }
];
