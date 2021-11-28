const fs = require('fs');

String.prototype = Object.assign(String.prototype, {
  replaceAll(search, replace) {
    let s = this.toString();
    let i = 0;
    while (s.match(search)) {
      s = s.replace(search, replace);
      if (i++ === 150) {
        console.log(s);
        throw new Error('Too much search');
      }
    }
    return s;
  },
});

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data), { flag: 'w' });
}
function read(file) {
  const data = JSON.parse(fs.readFileSync(file));
  return data;
}

write(
  './cdrmod.json',
  read('./cdrprices.json').map((product) => {
    product.name = product.name
      .toLowerCase()
      .replaceAll('á', 'a')
      .replaceAll('é', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ó', 'o')
      .replaceAll('ú', 'u');
    return product;
  })
);

write(
  './febomod.json',
  read('./feboprices.json').map((product) => {
    product.name = product.name
      .toLowerCase()
      .replaceAll('á', 'a')
      .replaceAll('é', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ó', 'o')
      .replaceAll('ú', 'u');
    return product;
  })
);

write(
  './toptecnomod.json',
  read('./toptecnoprices.json').map((product) => {
    product.name = product.name
      .toLowerCase()
      .replaceAll('á', 'a')
      .replaceAll('é', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ó', 'o')
      .replaceAll('ú', 'u');
    return product;
  })
);
