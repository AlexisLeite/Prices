const linksLength = links.length;
const pages = [];
async function steal() {
  let i = 0;
  for (let link of links) {
    console.log(`Fetching ${link}`);
    const res = await fetch(link);
    const text = await res.text();
    console.log(`Ok, ${linksLength - i++} remaining`);
    const root = document.createElement('div');
    root.innerHTML = text;

    const prods = [...root.querySelectorAll('.prod_cont')];
    const images = [...prods.map((prod) => prod.querySelector('img'))].map((img) => img.src);
    const titles = [...prods.map((prod) => prod.querySelector('.cont a'))].map((prod) =>
      prod.innerHTML.replaceAll(`\n`, '').replaceAll(`\t`, '').replace(`\"`, ``)
    );
    const costs = [...prods.map((cost) => cost.querySelector('.precio_cont .pprecio'))].map(
      (cost) => parseInt(cost.innerHTML)
    );
    const deci = [...prods.map((cost) => cost.querySelector('.precio_cont .pdeci'))].map((cost) => {
      let html = cost ? cost.innerHTML : '0';
      html = html && html[0] === ',' ? html.substr(1) : html;
      return cost ? parseInt(html) : 0;
    });
    const codes = [...prods.map((code) => code.querySelector('[itemprop="sku"]'))].map(
      (code) => code.innerHTML
    );
    const links = [...prods.map((link) => link.querySelector('a'))].map((a) => a.href);
    const copetes = [...prods.map((link) => link.querySelector('.copete'))].map(
      (copete) => copete.innerHTML
    );

    const products = prods.map((prod, i) => {
      return {
        title: titles[i],
        cost: costs[i] + deci[i] / 100,
        image: images[i],
        code: codes[i],
        link: links[i],
        copete: copetes[i],
      };
    });

    pages.push({
      link: window.location.href,
      pageTitle: document.title,
      products: [...products],
    });
  }
  download('productsInformation.json', pages);
}
