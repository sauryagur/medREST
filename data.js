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
