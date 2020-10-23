require('newrelic');
const app = require('./index.js');

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
