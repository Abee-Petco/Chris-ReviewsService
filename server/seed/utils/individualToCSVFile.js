// const csvWriter = require('csv-write-stream');

// const fs = require('fs');

// const individualToCSVfile = (writeStream, array) => {
//   (async () => {
//     for (let i = 0; i < array.length; i++) {
//       if (!writeStream.write(array[i])) {
//         await new Promise((resolve) => writeStream.once('drain', resolve));
//       }
//     }
//   })();
// };

// module.exports.individualToCSVfile = individualToCSVfile;
