const nodemailer = require('nodemailer');
const Subscriber = require('../models/subscriber');

const config = require('../config/config');
const emailConfig = require('../config/email-config');
const emailTemplate = require('../config/email-template');
const refreshInterval = 10000;

const transporter = nodemailer.createTransport(
    {
        service: emailConfig.EMAIL_SERVICE,
        auth: {
            user: emailConfig.EMAIL_USER,
            pass: emailConfig.EMAIL_PASSWORD
        }
    }
);

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
            from: emailConfig.EMAIL_FROM,
            to: to,
            subject: emailConfig.EMAIL_SUBJECT,
            html: emailTemplate.template,
        }
    },

    startEmailCountdown() {
        let target = getMilliseconds();
        if (target > 0) {
            console.log(`Message will be sent after: ${Math.floor(target / 1000)} seconds`);
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
        transporter.sendMail(this.getEmailOptions(to), (err, response) => {
            if (err) {
                console.log(`ERROR: An error occurred during email sending: ${err}`)
            } else {
                console.log(`Mail has been successfully sent to ${response.accepted}`)
            }
        })
    }
};

module.exports = emailService;
