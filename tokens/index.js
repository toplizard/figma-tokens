const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const fs = require('fs');
const tokens = require('./tokens');
Object.values(Object.keys(tokens)).map((directory) => {
  !directory.includes('$') && !fs.existsSync(`tokens/${directory}`)
    ? fs.mkdirSync(`tokens/${directory}`)
    : null;
});
const dirs = (p) =>
  readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory());
module.exports = dirs(__dirname);
