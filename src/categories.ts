import { ap } from './categories/ap';
import { auto } from './categories/auto';
import { cameras } from './categories/cameras';
import { combos } from './categories/combos';
import { folders } from './categories/folders';
import { headphones } from './categories/headphones';
import { highlights as Highlights } from './categories/highlights';
import { keyboards } from './categories/keyboards';
import { mouses } from './categories/mouses';
import { notebookNew } from './categories/notebookNew';
import { notebookRefubrished } from './categories/notebookRefubrished';
import { pcNew } from './categories/pcNew';
import { pcRefubrished } from './categories/pcRefubrished';
import { printers } from './categories/printers';
import { screensNew } from './categories/screensNew';
import { screensRefubrished } from './categories/screensRefubrished';
import { security } from './categories/security';
import { smartWatch } from './categories/smartWatchs';
import { speakers } from './categories/speakers';
import { tvbox } from './categories/tvbox';
import { usbWifi } from './categories/usbWifi';
import { webcams } from './categories/webcams';
/* 
{
    title: '',
    description:
      '',
    products: ap,
  },
 */
export interface ProductInterface {
  title: string;
  image: string;
  code: string;
  cost: number;
}
function parse(products: { paginated: ProductInterface[][] }[]) {
  const newProducts: ProductInterface[] = [];
  for (let product of products) {
    for (let page of product.paginated) newProducts.push(...page);
  }
  return newProducts;
}
export const highlights: { title: string; description: string; products: ProductInterface[] } = {
  title: 'Productos destacados',
  description:
    'El siguiente listado tiene como única finalidad facilitarte el acceso a los productos más destacados de cada categoría. Todos los productos del listado cuentan con garantía de fabricante. Consulte por el catálogo completo de productos',
  products: parse(Highlights),
};
export const products: { title: string; description: string; products: ProductInterface[] }[] = [
  {
    title: 'Combos de teclado y mouse',
    description: 'Entra en nuestra web para ver toda la variedad de precios y colores. ',
    products: parse(combos),
  },
  {
    title: 'Auriculares y micrófonos',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(headphones),
  },
  {
    title: 'Cámaras web',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(webcams),
  },
  {
    title: 'Cámaras',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(cameras),
  },
  {
    title: 'Estuches, mochilas y valijas',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(folders),
  },
  {
    title: 'Teclados',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(keyboards),
  },
  {
    title: 'Mouses y touchpads',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(mouses),
  },
  {
    title: 'Notebooks nuevas',
    description:
      'Consulte por sus necesidades específicas. Se listan solamente las opciones más representativas, sin embargo la variedad en tamaños de pantalla, marcas, colores y especificaciones es mucho mayor. Entra en nuestra web para ver toda la variedad.',
    products: parse(notebookNew),
  },
  {
    title: 'Notebooks refabricadas (6 meses de garantía)',
    description:
      'Consulte por sus necesidades específicas. Se listan solamente las opciones más representativas, sin embargo la variedad en tamaños de pantalla, marcas, colores y especificaciones es mucho mayor. Entra en nuestra web para ver toda la variedad.',
    products: parse(notebookRefubrished),
  },
  {
    title: 'PC nuevas',
    description:
      'Consulte por sus necesidades específicas. Se listan solamente las opciones más representativas, sin embargo la variedad en tamaños de pantalla, marcas, colores y especificaciones es mucho mayor. Entra en nuestra web para ver toda la variedad.',
    products: parse(pcNew),
  },
  {
    title: 'PC refabricadas (6 meses de garantía)',
    description:
      'Consulte por sus necesidades específicas. Se listan solamente las opciones más representativas, sin embargo la variedad en tamaños de pantalla, marcas, colores y especificaciones es mucho mayor. Entra en nuestra web para ver toda la variedad.',
    products: parse(pcRefubrished),
  },
  {
    title: 'Impresoras',
    description: 'Consulte por tonners y cartuchos',
    products: parse(printers),
  },
  {
    title: 'Monitores y pantallas nuevas',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(screensNew),
  },
  {
    title: 'Monitores y pantallas refabricadas',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(screensRefubrished),
  },
  {
    title: 'Sistemas de seguridad',
    description:
      'El listado a continuación está incompleto, contamos con una variedad extensa en productos de seguridad de las marcas más importantes. Contamos también con servicio de instalación y garantía de sistemas de videovigilancia y alarma. Entra en nuestra web para ver toda la variedad de precios y servicios.',
    products: parse(security),
  },
  {
    title: 'Smart watchs (relojes inteligentes)',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(smartWatch),
  },
  {
    title: 'Parlantes y micrófonos',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(speakers),
  },
  {
    title: 'Tv box, convierta su televisión en smart TV',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(tvbox),
  },
  {
    title: 'Antenas Wifi USB',
    description:
      'Extienda su red wifi de forma sencilla. Contamos con servicio técnico para instalar los dispositivos así como para realizar un diagnóstico de su situación y lograr la mejor solución para sus necesidades. Entra en nuestra web para ver toda la variedad de precios y servicios.',
    products: parse(usbWifi),
  },
  {
    title: 'Access points',
    description:
      'Extienda su red wifi de forma sencilla. Contamos con servicio técnico para instalar los dispositivos así como para realizar un diagnóstico de su situación y lograr la mejor solución para sus necesidades. Entra en nuestra web para ver toda la variedad de precios y servicios.',
    products: parse(ap),
  },
  {
    title: 'Soportes para auto',
    description: 'Entra en nuestra web para ver toda la variedad de colores y precios.',
    products: parse(auto),
  },
];

export const titles = products.map((prod) => prod.title);
