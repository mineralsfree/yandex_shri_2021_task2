const fs = require('fs');
const lol = require('./smallData.json');
const kek = require('./summary.json');
fs.writeFileSync('data.json', JSON.stringify([...lol, ...kek]));
