const config = require('../config/config');

let countdownRoutes = {
  getTarget (req, res) {
    return res.status(200).json({ status: 200, countdownTarget: config.COUNTDOWN_TARGET })
  }
};

module.exports = countdownRoutes;
