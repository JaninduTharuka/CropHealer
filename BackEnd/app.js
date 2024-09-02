const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PythonShell } = require('python-shell');
const axios = require('axios');
const {exec} = require('child_process');

const fs = require('fs');
const path = require('path');
const { time } = require('console');
const { report } = require('process');
// const os = require('os');
// const tempfile = require('tempfile');


const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/CropHealerDB')
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Error connecting to Database...:', err));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reports: {
        type: Array,
        default: []
    }
});
const User = mongoose.model('User', userSchema);


function runPythonScript() {
    // Replace with the path to your Python interpreter
    const pythonPath = "C:/Users/janin/AppData/Local/Programs/Python/Python312/python.exe";
    const scriptPath = 'models/predict.py';

    console.log(`Python path: ${pythonPath}`);
    console.log(`Script path: ${scriptPath}`);


    console.log('Running Python script...');

    exec(`${pythonPath} ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            return;
        }
        console.log(`Python script output: ${stdout}`);
    });
}

// Call the function to run the Python script when the server starts
runPythonScript();


app.route('/login')
    .post(async (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        User.findOne({ email: email})
            .then((user) => {
                if (user) {
                    if (user.password === password) {
                        res.status(200).json({ success: true, userId: user._id});
                    } else {
                        res.status(401).json({ success: false, message: "Incorrect password" });
                    }
                } else {
                    res.status(404).json({ success: false, message: "User not found" });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error occurred" });
            });
    });

app.route('/register')
    .post(async (req, res) => {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password
        });
        // save user iff email is unique
        User.findOne({ email: email })
            .then((foundUser) => {
                if (foundUser) {
                    res.status(409).json({ success: false, message: "User already exists" });
                } else {
                    user.save()
                        .then(() => {
                            res.status(201).json({ success: true, userId: user._id});
                        })
                        .catch((err) => {
                            res.status(500).json({ success: false, message: "Error occurred" });
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error occurred" });
            });
    });



app.route('/user/:userId')
    .get(async (req, res) => {
        const userId = req.params.userId;
        User.findById(userId)
            .then((user) => {
                if (user) {
                    res.status(200).json({ success: true, user: user });
                } else {
                    res.status(404).json({ success: false, message: "User not found" });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error occurred" });
            });
    });



app.route('/predict')
    app.post('/predict', async (req, res) => {
        const { image } = req.body;
        console.log('Received image');

        try {
            const response = await axios.post('http://localhost:6000/predict', { image: image },
                { headers: { 'Content-Type': 'application/json; charset=utf-8' }, responseType: 'json' }, timeout = 10000);
            console.log('Response from Python server:', response.data);
            const prediction = response.data;
            res.status(200).json({ success: true, result: prediction });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Error occurred" });
        }
    });

app.route('/report/:userId')
    .post(async (req, res) => {
        const userId = req.params.userId;
        const report = req.body;
        User.findById(userId)
            .then((user) => {
                if (user) {
                    user.reports.push(report);
                    user.save()
                        .then(() => {
                            res.status(200).json({ success: true });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ success: false, message: "Error occurred" });
                        });
                } else {
                    res.status(404).json({ success: false, message: "User not found" });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ success: false, message: "Error occurred" });
            });
    });

    

app.listen(5000, () => {
    console.log('Server started on port 5000');
});