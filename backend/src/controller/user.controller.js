const express = require('express');
const router = express.Router();
const UserModel = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    console.log(req.body);
    if(!req.body.username || !req.body.password || !req.body.email) {
        return res.status(404).send({message: "Must include email, username AND password"});
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    return UserModel.addUser(req.body)
        .then((success) => res.json(success))
        .catch(error => res.sendStatus(500).send(error));
});

router.post('/authenticate', function (req, res) {
    const {username, password} = req.body;
    UserModel.getUserByUserName(username)
        .then((user) => {
            if (user === null) {
                return res.status(404).send('No user found');
            }
            console.log("Found user in db", user);
            if (bcrypt.compareSync(password, user.password)) {
                const payload = username;
                const token = jwt.sign({username: payload}, process.env.SECRET, {
                    expiresIn: '1h',
                })

                res.cookie('token', token, {httpOnly: true})
                    .send({token});
            } else {
                return res.status(404).send('Invalid username or password!');
            }
        })
        .catch((error) => console.log(`Something went wrong ${error}`));
});

router.get('/getAllUsers', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));

router.get('/getUser/:user', function (req, res) {
    UserModel.getUserByUserName(req.params.user)
        .then(user => res.send(user))
})


module.exports = router;