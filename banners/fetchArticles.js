const updatedArticles = [];

async function fetchInfo() {
  let i = 0;
  for (let product of products) {
    try {
      console.log(`Fetching ${product.title}`);
      const res = await fetch(product.link);
      const text = await res.text();
      console.log(`Ok, ${products.length - i++} remaining`);

      const root = document.createElement('div');
      root.innerHTML = text;

      const description = root.querySelector('.desc').innerHTML;
      const matchRes = text.match(/vec_fotos_gigantes=Array\(([^\)]+)\)/);
      const images = matchRes ? JSON.parse(`[${matchRes[1].replaceAll("'", '"')}]`) : [];
      updatedArticles.push({ ...product, description, images });
    } catch (e) {
      console.error(e);
      console.error(product.title);
    }
  }
  download('updatedProducts.json', updatedArticles);
}

//FEBO

const updatedArticles = [];

async function fetchInfo() {
  for (let i = 0; i < 175; i++) {
    try {
      console.log(`Fetching ${i}`);
      const res = await fetch(`https://febo.com.uy/categoria-producto/mlu1648/page/${i}/`);
      const text = await res.text();
      console.log(`Ok, ${175 - (i + 1)} remaining`);

      const root = document.createElement('div');
      root.innerHTML = text;

      const products = [...root.querySelectorAll('.product-small:not(.box)')].map((product) => {
        let ret = {};
        try {
          const images = [product.querySelector('.container-image-and-badge img').src];
          const name = product.querySelector('.product-title a').innerHTML;
          const link = product.querySelector('.product-title a').href;
          const cost = (product.querySelector('.ahora') || { innerHTML: '0' }).innerHTML;
          ret = { images, name, link, cost };
        } catch (e) {
          console.error(e);
        } finally {
          return ret;
        }
      });
      updatedArticles.push(...products);
      if (i === 0) break;
    } catch (e) {
      console.error(e);
      console.error(product.title);
    }
  }
  download('updatedProducts.json', updatedArticles);
}
