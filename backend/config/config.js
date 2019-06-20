module.exports = {
  'API_PREFIX': 'api',
  'API_VERSION': 'v1',
  'IS_PRODUCTION': process.env.NODE_ENV === 'production',
  'COUNTDOWN_TARGET': new Date(2019, 5, 20, 20).getTime(),
  'DR_URL': 'mongodb://localhost:27017/countdown',
  'SECRET': 'SECRET',
  'EMAIL_SERVICE': 'gmail',
  'EMAIL_FROM': 'youremail@address.com',
  'EMAIL_PASSWORD': 'SECRET',
  'EMAIL_SUBJECT': 'Thanks for subscribe',
  'EMAIL_HTML': '<h1>We will contact you soon...</h1>'
};
