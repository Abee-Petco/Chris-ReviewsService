const server = require('./index.js');

console.log(process.env.node_env);
server.listen(3001, () => {
  console.log('Listening on port 3001');
});
