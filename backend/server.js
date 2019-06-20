const config = require('./config/config');
const express = require('express');
const routes = require('./routes');
const app = express();
const emailService = require('./email/email-service');
const port = process.env.PORT || 8080;

app.use(`/${config.API_PREFIX}/${config.API_VERSION}`, routes);
if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening starts on port: ${port}`);
        if (config.IS_PRODUCTION) {
            emailService.startEmailCountdown()
        }
    })
}
