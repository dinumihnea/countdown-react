/* eslint-disable handle-callback-err */

const config = require('../config/config');
const Subscriber = require('../models/subscriber');

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Database connection
const mongoose = require('mongoose');
mongoose.connect(config.DR_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected.')
});

let subscriberRoutes = {
    insertSubscriber(req, res) {
        console.log(req.body);

        if (req.body.subscriber) {
            const newSubscriberEmail = req.body.subscriber;
            // Check mail
            if (EMAIL_REGEX.test(newSubscriberEmail)) {
                Subscriber.findOne({email: newSubscriberEmail}, (err, obj) => {
                    if (obj) {
                        res.status(200).json({status: 409, message: 'Already exists!'});
                        console.log(`WARNING: Subscriber with email ${newSubscriberEmail}, already exists.`)
                    } else {
                        const subscriber = new Subscriber({
                            email: newSubscriberEmail,
                            date: new Date()
                        });
                        subscriber.save((err) => {
                            // Send save response
                            if (err) {
                                console.log(err);
                                res.status(500).send(err)
                            } else {
                                res.status(200).json({status: 201, message: 'Successfully created!'});
                                console.log(`Subscriber with email ${subscriber.email} successfully crated.`)
                            }
                        })
                    }
                })
            } else {
                res.status(200).json({status: 403, message: 'Invalid email!'});
                console.log(`WARNING: Invalid email address.`)
            }
        } else {
            console.log(req.body.subscriber);
            res.status(200).json({status: 400, message: 'Bad request!'});
            console.log(`ERROR: Request doesn't contain subscriber object.`)
        }
    }
};

module.exports = subscriberRoutes;
