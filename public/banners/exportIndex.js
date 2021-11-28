const fs = require('fs');
const { JsxEmit } = require('typescript');

const directories = fs.readdirSync('./products');

const index = [];
for (let dir of directories) {
  const desc = JSON.parse(fs.readFileSync(`./products/${dir}/desc.json`));
  desc.images = desc.images.map((image) => `/banners/products/${dir}/${image}`);
  index.push(desc);
}
fs.writeFileSync('./index.json', JSON.stringify(index));
