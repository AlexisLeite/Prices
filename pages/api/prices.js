const fs = require('fs');

console.log('Reading files');

function replaceAll(s, search, replace) {
  while (s.match(search)) {
    s = s.replace(search, replace);
  }
  return s;
}

const products = [
  ...JSON.parse(fs.readFileSync(process.cwd() + '/cdrprices.json')).map((product) => ({
    ...product,
    store: 'cdr',
  })),
  ...JSON.parse(fs.readFileSync(process.cwd() + '/toptecnoprices.json')).map((product) => ({
    ...product,
    store: 'toptecno',
  })),
  ...JSON.parse(fs.readFileSync(process.cwd() + '/feboprices.json')).map((product, i) => ({
    ...product,
    store: 'febo',
    code: `FEBO${i}`,
  })),
];

// API:
/* 

Query params:

name: string // It will be used to compose a regular expression in order to match all possible results. The space will be used as space in the first search, will be removed in the second and as a comodin in the third search.
priceup: number // It will be used to filter only products with their prices less than the indicated
pricedown: number // It will be used to filter only products with their prices more than the indicated
store: string // used to filter in an only store

Return value:
{
  price: number;
  name: string;
  link: string;
  code: string;
  store: "toptecno" || "cdr"
}
*/
export default function search(req, res) {
  let resultProducts = products;
  if (req.query.name) {
    const firstQuery = new RegExp(`${replaceAll(req.query.name.toLowerCase(), ' ', '')}`);
    resultProducts = products.filter((product) => {
      if (!('name' in product)) {
        console.log(product);
      }
      return replaceAll(product.name.toLowerCase(), ' ', '').match(firstQuery);
    });
    /* 
    const secondQuery = new RegExp(`${req.query.name.toLowerCase().replace(' ', '')}`);
    const secondResult = products.filter(
      (product) =>
        product.name.toLowerCase().match(secondQuery) &&
        resultProducts.find((el) => el.code === product.code) === undefined
    ); */
    const thirdQuery = new RegExp(
      `${replaceAll(req.query.name.toLowerCase(), ' ', '').replace(' ', '.*')}`
    );
    const thirdResult = products.filter((product) => {
      return (
        replaceAll(product.name.toLowerCase(), ' ', '').match(thirdQuery) &&
        resultProducts.find((el) => {
          return el.code === product.code;
        }) === undefined
      );
    });

    resultProducts = [...resultProducts, ...thirdResult];
  }
  if (req.query.priceup) {
    resultProducts = resultProducts.filter((product) => product.price <= req.query.priceup);
  }
  if (req.query.pricedown) {
    resultProducts = resultProducts.filter((product) => product.price >= req.query.pricedown);
  }
  if (req.query.store) {
    resultProducts = resultProducts.filter((product) => product.store === req.query.store);
  }
  res.json(resultProducts);
}
