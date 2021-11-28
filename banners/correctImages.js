const fs = require('fs');

const productFolders = fs.readdirSync('./products');

for (let folder of productFolders) {
  fs.unlinkSync(`./products/${folder}/desc.json`);
  fs.renameSync(`./products/${folder}/desc1.json`, `./products/${folder}/desc.json`);
}
