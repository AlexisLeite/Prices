var fs = require('fs'),
  request = require('request');
const products = JSON.parse(fs.readFileSync('./updatedProducts (4).json'));

async function download(uri, filename, callback = () => {}) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on('close', () => resolve());
    });
  });
}

async function fetch() {
  for (let product of products) {
    try {
      console.log(`Fetching ${product.title}`);
      const dir = `./products/${product.code}`;
      fs.mkdirSync(dir);
      for (let image of product.images) {
        const fileName = image.split('/').pop().split('?').shift();
        console.log(`Fetching ${fileName}`);
        await download(image, `${dir}/${fileName}`);
        console.log('ok');
      }
      product.images = product.images.map((src) => src.split('/').pop().split('?').shift());
      fs.writeFileSync(`${dir}/desc.json`, JSON.stringify(product));
      console.log('Product fetched');
    } catch (e) {
      console.error(e);
      console.error(product.title);
    }
  }
}

fetch();
