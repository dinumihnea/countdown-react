const config = require('../config/config');
const nodemailer = require('nodemailer');
const Subscriber = require('../models/subscriber');
const refreshInterval = 60 * 1000;

let transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {
        user: config.EMAIL_FROM,
        pass: config.EMAIL_PASSWORD
    }
});

function getMilliseconds() {
    let diff = Math.floor(config.COUNTDOWN_TARGET - new Date().getTime());
    if (diff < -refreshInterval) {
        console.log('ERROR: Target date is less than now.')
    }
    return diff
}

let emailService = {

    getEmailOptions(to) {
        return {
            from: config.EMAIL_FROM,
            to: to,
            subject: config.EMAIL_SUBJECT,
            html: config.EMAIL_HTML
        }
    },

    startEmailCountdown() {
        let target = getMilliseconds();
        if (target > 0) {
            // TODO validate console time displaying
            console.log(`Message will be send after: ${Math.floor(target / 1000)} seconds`);
            setTimeout(() => {
                this.startEmailCountdown()
            }, refreshInterval)
        } else if (target < 0 && target >= -refreshInterval) {
            this.sendToAllSubscribers()
        } else {
            console.log('Exit from email countdown.')
        }
    },

    sendToAllSubscribers() {
        console.log('Sending mail...');
        Subscriber.find({}, 'email', (error, subscribers) => {
            if (error) {
                console.log(error)
            } else {
                emailService.sendMail(subscribers)
            }
        })
    },

    sendMail(to) {
        transporter.sendMail(this.getEmailOptions(to), function (err, response) {
            if (err) {
                console.log(`ERROR: An error occurred during email sending: ${err}`)
            } else {
                console.log(`Mail has been successfully sent to ${response.accepted}`)
            }
        })
    }
};

module.exports = emailService;
