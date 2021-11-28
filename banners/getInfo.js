const filter = require('./filter21.11.21').default;
const updated = require('./updatedPrices').default;
const fs = require('fs');

let products = [];
for (let f of filter) {
  for (let page of f.paginated) products.push(...page);
}
products = products.map((product) => {
  for (let upd of updated) {
    if (product.code === upd.code) return upd;
  }
  throw new Error('Code not found');
});

fs.writeFileSync('./links.json', JSON.stringify(products), { flag: 'w' });
