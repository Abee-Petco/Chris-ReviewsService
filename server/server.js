// require('newrelic');
const app = require('./index.js');

console.log(process.env.node_env);
app.listen(3001, () => {
  console.log('Listening on port 3001');
});
