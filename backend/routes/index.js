const parser = require('body-parser');
const router = require('express').Router();
const subscriberRoutes = require('./subscriber-routes');
const countdownRoutes = require('./countdown-routes');

// Router configurations
router.use(parser.json());
router.use(parser.urlencoded({extended: true}));
router.use((req, res, next) => {
    // Next command allows requests from any app, to avoid this,
    // just put your app URL as value for 'Access-Control-Allow-Origin'
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next()
});

// Routes
router.route('/subscribers').post(subscriberRoutes.insertSubscriber);
router.route('/countdown').get(countdownRoutes.getTarget);

module.exports = router;
