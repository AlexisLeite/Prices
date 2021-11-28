const visited = [],
  toVisit = [],
  productPages = [];

async function steal() {
  const products = [];
  console.log('Fetching site');
  const res = await fetch('https://www.cdrmedios.com/');
  const text = await res.text();
  console.log('Ready');

  const root = document.createElement('div');
  root.innerHTML = text;

  const links = [...root.querySelectorAll('.dl-menu a')].map((link) => link.href);
  toVisit.push(...links);

  while (toVisit.length) {
    const link = toVisit.shift();
    if (visited.indexOf(link) > 0) continue;

    console.log(`Fetching ${link}`);
    visited.push(link);
    productPages.push(link);
    const res = await fetch(link);
    const text = await res.text();
    console.log('Ready');

    const root = document.createElement('div');
    root.innerHTML = text;

    const links = [...root.querySelectorAll('.paginainactiva a')].map((a) => a.href);
    toVisit.push(...links);
  }
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(text))
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
