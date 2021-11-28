const products = require('./filter21.11.21').filtered;
const fs = require('fs');

const serialized = [];
for (let category of products) {
  for (let page of category.paginated) {
    for (let product of page) {
      serialized.push(product);
    }
  }
}

fs.writeFileSync(
  './serialized.js',
  `export const serialized = JSON.parse(\`${JSON.stringify(serialized)}\`)`,
  { flag: 'w' }
);
