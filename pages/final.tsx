/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';
import { highlights, ProductInterface, products as Products } from '../src/categories';
import { updated } from '../src/updatedPrices';
import Image from 'next/image';
import logo from '../logo250x63.png';
import {
  RiWhatsappFill,
  RiFacebookCircleFill,
  RiInstagramFill,
  RiEarthFill,
  RiTruckFill,
} from 'react-icons/ri';

interface PageProps {
  children: ReactElement | ReactElement[] | string;
}
function Cost({ code }: { code: string }) {
  return (
    <div className="Cost">
      <div>
        <strong>U$S {getPrice(code)}</strong>
      </div>
      <div>$ {Math.round(getPrice(code, true))}</div>
    </div>
  );
}
function Page({ children }: PageProps) {
  return (
    <div className="Page">
      <div className="PageHead">
        <Image src={logo} alt="" width={250} height={75} />
        <div style={{ color: 'green' }}>
          <RiTruckFill color="green" size={40} /> Envíos sin cargo{' '}
          <small>para compras mayores a $1000.</small>
        </div>
      </div>
      <div className="PageContent">{children}</div>
      <div className="PageFoot">
        <div>
          <a target="_blank" rel="noreferrer" href="https://huga.uy">
            <RiEarthFill color="red" size={40} /> http://huga.uy
          </a>
        </div>
        <div>
          <a target="_blank" rel="noreferrer" href="tel:099105304">
            <RiWhatsappFill color="green" size={40} /> 099105304
          </a>
        </div>
        <div>
          <a target="_blank" rel="noreferrer" href="https://facebook.com/huga.ury">
            <RiFacebookCircleFill color="blue" size={40} /> fb.com/huga.ury
          </a>
        </div>
        <div>
          <a target="_blank" rel="noreferrer" href="https://instagram.com/huga.uy">
            <RiInstagramFill color="#be00ff" size={40} /> ig.com/huga.uy
          </a>
        </div>
      </div>
    </div>
  );
}

interface Props {}

let cotizacion = 44.95;
function paginate<Type>(
  products: Type[],
  firstPage = 12,
  perPage = 12
): { first: Type[]; pages: Type[][] } {
  const auxProducts = [...products];
  let paginated: Type[][] = [auxProducts.splice(0, firstPage)];
  while (auxProducts.length) {
    paginated.push(auxProducts.splice(0, perPage));
  }
  return { first: paginated[0], pages: paginated.splice(1) };
}

const processed: Record<string, number> = {};
function getPrice(cod: string, pesos = false) {
  let price: number = 0;
  if (cod in processed) price = processed[cod];
  else {
    for (let upd of updated) {
      if (upd.code === cod) {
        price = upd.cost;
        processed[cod] = price;
      }
    }
  }

  let multiplier = pesos ? cotizacion : 1;
  return Math.round(price * multiplier * 1.22 * 1.15 * 100) / 100;
}

const Highlights = paginate(highlights.products, 6, 9);

export default function Final({}: Props): ReactElement {
  const [products, setProducts] = React.useState<
    {
      title: string;
      description: string;
      products: ProductInterface[];
    }[]
  >();
  React.useEffect(() => {
    setProducts(Products);
  }, []);
  return (
    <div id="Catalogue">
      <div id="Highlights">
        <Page>
          <div id="Presentation">
            <ul>
              <li>Servicio técnico en PC y redes.</li>
              <li>Venta de insumos y equipos informáticos.</li>
              <li>
                Trabajos y productos <strong>garantidos</strong>.
              </li>
            </ul>
          </div>
          <h1>Productos destacados</h1>
          <div className="Grid-3">
            {Highlights.first.map((highlight) => (
              <div className="Highlight" key={highlight.code}>
                <img src={highlight.image} alt="" />
                <h2>
                  <small>[{highlight.code}]</small> {highlight.title}
                </h2>
                <Cost code={highlight.code} />
              </div>
            ))}
          </div>
        </Page>
        {Highlights.pages &&
          Highlights.pages.map((highlight, i) => (
            <Page key={i}>
              <div className="Grid-3">
                {highlight.map((highlight) => (
                  <div className="Highlight" key={highlight.title}>
                    <img src={highlight.image} alt="" />
                    <h2>
                      <small>[{highlight.code}]</small> {highlight.title}
                    </h2>
                    <Cost code={highlight.code} />
                  </div>
                ))}
              </div>
            </Page>
          ))}
      </div>
      {products &&
        Products.map((category) => {
          const products = paginate(category.products);
          return (
            <div className="Category" key={category.title}>
              <Page>
                <h1>{category.title}</h1>
                <p>{category.description}</p>
                <table className="Product">
                  {products.first.map((product) => (
                    <tr key={product.code}>
                      <td>
                        <img src={product.image} alt="" />
                      </td>
                      <td>
                        <small>[{product.code}]</small>
                        {product.title}
                      </td>
                      <td>
                        <Cost code={product.code} />
                      </td>
                    </tr>
                  ))}
                </table>
              </Page>
              {products.pages.map((page, i) => (
                <Page key={i}>
                  <h1>{category.title}</h1>
                  <p>{category.description}</p>
                  <table className="Product">
                    {page.map((product) => (
                      <tr key={product.code}>
                        <td>
                          <img src={product.image} alt="" />
                        </td>
                        <td>
                          <small>[{product.code}]</small>
                          {product.title}
                        </td>
                        <td>
                          <Cost code={product.code} />
                        </td>
                      </tr>
                    ))}
                  </table>
                </Page>
              ))}
            </div>
          );
        })}
      {/* {products &&
        products.map((category) => {
          return (
            <div key={category.title} className="Category">
              <h1>{category.title}</h1>
              <p>{category.description}</p>
              {paginate(category.products).map((page, i) => {
                return (
                  <table className="Page" key={i}>
                    <tbody>
                      {page.map((product) => {
                        return (
                          <tr key={product.code}>
                            <td>
                              <img src={product.image} alt="" />
                            </td>
                            <td>
                              <small>[{product.code}]</small> {product.title}
                            </td>
                            <td>
                              <div className="Cost">
                                <div>
                                  <strong>U$S {getPrice(product.code)}</strong>
                                </div>
                                <div>$ {getPrice(product.code, true)}</div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })}
            </div>
          );
        })} */}
    </div>
  );
}
