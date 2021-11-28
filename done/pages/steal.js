import React, { ReactElement } from 'react';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const pages = [];

async function steal() {
  /*  const products = [];
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

    visited.push(link);
    productPages.push(link);
    const res = await fetch(link);
    const text = await res.text();
    console.log('Ready');

    const root = document.createElement('div');
    root.innerHTML = text;

    const links = [...root.querySelectorAll('.paginainactiva a')].map((a) => a.href);
    toVisit.push(...links);
  } */
  let i = 0;
  for (let link of links) {
    console.log(`Fetching ${link},  ${links.length - i++} remaining`);
    const res = await fetch(link);
    const text = await res.text();
    console.log('ok');
    const root = document.createElement('div');
    root.innerHTML = text;

    const prods = [...root.querySelectorAll('.prod_cont')];
    const images = [...prods.map((prod) => prod.querySelector('img'))].map((img) => img.src);
    const titles = [...prods.map((prod) => prod.querySelector('.cont a'))].map((prod) =>
      prod.innerHTML.replaceAll(`\n`, '').replaceAll(`\t`, '').replace(`\"`, ``)
    );
    const costs = [...prods.map((cost) => cost.querySelector('.pprecio'))].map(
      (cost) => parseInt(cost.innerHTML) * 1.22 * 1.35
    );
    const codes = [...prods.map((code) => code.querySelector('[itemprop="sku"]'))].map(
      (code) => code.innerHTML
    );

    const catalogue = prods.map((prod, i) => ({
      title: titles[i],
      cost: costs[i],
      image: images[i],
      code: codes[i],
    }));

    pages.push({
      pageTitle: document.title,
      products: [...catalogue],
    });
  }

  download('prods.json', JSON.stringify(pages));
}
