const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
    }
});
const User = mongoose.model('User', userSchema);


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


app.listen(5000, () => {
    console.log('Server started on port 5000');
});