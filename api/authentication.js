'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const User = require('./models').User;


exports.authenticateUser = async (req, res, next) => {
    let message; // declare message variable 

    
    const credentials = auth(req);
    console.log(credentials)

    if (credentials) {
        const user = await User.findOne({raw : true , where: {emailAddress: credentials.name} });
        if (user) {
            const authenticated =
            (await bcrypt.compare(credentials.pass, user.password)) ||
            credentials.pass === user.password;

            console.log(authenticated);

            if (authenticated) {
            console.log(`Authentication successful for email address: ${user.emailAddress}`);
    
            
            req.currentUser = user;
            } else {
                message = `Authentication failed for email address: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for email address: ${credentials.name}`;
        } 
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
}