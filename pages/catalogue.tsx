/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';
import { products } from '../src/categories';
import { updated } from '../src/updatedPrices';

interface Props {}

export default function Catalogue({}: Props): ReactElement {
  return <CatalogueRender products={products} />;
}

function getPrice(code: string) {
  for (let product of updated) {
    if (product.code === code)
      return `$ ${Math.round(product.cost * 1.1 * 1.22 * 45)}, U$S ${Math.round(
        product.cost * 1.1 * 1.22
      )}, GAN: ${Math.round(product.cost * 0.1 * 1.22 * 45)}`;
  }
  console.log(code);
  return '!!!';
}

const perPage = 8;
function CatalogueRender({
  products,
}: {
  products: { title: string; products: any[]; paginated?: any[] }[];
}): ReactElement {
  const [generatedProducts, setNewProducts] =
    React.useState<{ title: string; products: any[]; paginated?: any[] }[]>();
  const [exportProducts, setExport] = React.useState<false | string>(false);
  const [showExport, setShowExport] = React.useState(false);

  React.useEffect(() => {
    const sourceProducts = generatedProducts ?? products;

    for (let h = 0; h < sourceProducts.length; h++) {
      if (sourceProducts[h].paginated!) break;
      sourceProducts[h].paginated = [];
      while (sourceProducts[h].products.length) {
        sourceProducts[h].paginated!.push(sourceProducts[h].products.splice(0, perPage));
      }
    }

    setNewProducts(sourceProducts);
    setExport(JSON.stringify(sourceProducts));
  }, [generatedProducts]);

  return showExport ? (
    <>
      <div id="Controls">
        <style jsx>{`
          @media print {
            #Controls {
              display: none;
            }
          }
        `}</style>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            setShowExport(!showExport);
          }}
          style={{ backgroundColor: 'white', color: 'black', padding: '5px 15px' }}
          type="submit"
        >
          Mostrar código fuente
        </button>
      </div>
      <pre style={{ width: '90vw', whiteSpace: 'break-spaces' }}>
        {JSON.stringify(exportProducts)}
      </pre>
    </>
  ) : (
    <form
      style={{ background: 'white', width: '200mm', margin: 'auto' }}
      onSubmit={(ev) => {
        ev.preventDefault();

        let categories: { title: string; products: any[]; paginated?: any[] }[] = [];
        const products = [
          ...(document.querySelectorAll(
            'input[type="checkbox"]:checked'
          ) as any as Array<HTMLElement>),
        ];
        for (let product of products) {
          const category = product.dataset.category;
          if (!category) throw new Error('Found checkbox without data-category');

          let categoryIndex: { title: string; products: any[] } = categories.filter(
            (search) => search.title === category
          )[0];
          if (!categoryIndex) {
            categoryIndex = { title: category, products: [] };
            categories.push(categoryIndex);
          }

          const row = product.parentElement!.parentElement!.parentElement;
          const prod = JSON.parse(row!.dataset.product!);

          categoryIndex.products.push(prod);
        }

        for (let h = 0; h < categories.length; h++) {
          categories[h].paginated = [];
          while (categories[h].products.length) {
            categories[h].paginated!.push(categories[h].products.splice(0, perPage));
          }
        }
        setNewProducts(categories);
      }}
    >
      <div id="Controls">
        <button
          style={{ backgroundColor: 'white', color: 'black', padding: '5px 15px' }}
          type="submit"
        >
          Exportar
        </button>
        <button
          onClick={(ev) => {
            ev.preventDefault();
            setShowExport(!showExport);
          }}
          style={{ backgroundColor: 'white', color: 'black', padding: '5px 15px' }}
          type="submit"
        >
          Mostrar código fuente
        </button>
      </div>
      <style jsx>{`
        @media print {
          #Controls {
            display: none;
          }
        }
        #Controls {
          position: fixed;
          top: 0;
          left: 0;
          width: 150px;
        }
        table {
          border: 1px solid black;
          border-collapse: collapse;
          page-break-before: always;
          margin-top: 20px;
        }

        .Category {
          page-break-before: always;
        }

        .Category > table:first-of-type {
          page-break-before: avoid;
        }

        td {
          padding: 10px;
          border: 1px solid black;
        }

        td:first-of-type {
          width: 30px;
        }
        td:nth-child(2) {
          width: 170px;
        }
        td:nth-child(3) {
          width: calc(200mm - 352px);
        }
        td:last-of-type {
          width: 150px !important;
        }

        h1 {
          text-transform: uppercase;
          font-weight: bold;
          text-decoration: underline;
          font-size: 16pt;
          padding-left: 30px;
          padding-top: 20px;
        }

        * {
          color: black;
          background: transparent;
        }
      `}</style>
      {generatedProducts &&
        generatedProducts.map((category, i) => {
          return (
            <div className="Category" key={i}>
              <h1>{category.title}</h1>
              {category.paginated!.map((page: any, i: number) => {
                return (
                  <table key={i} style={{ width: '100%' }}>
                    {page.map((prod: any) => (
                      <tr key={prod.title} data-product={JSON.stringify(prod)}>
                        <td>
                          <label>
                            <input data-category={category.title} type="checkbox" />
                          </label>
                        </td>
                        <td>
                          <img
                            style={{ width: '140px', height: '100px', maxWidth: '140px' }}
                            src={prod.image}
                            alt="Image of product"
                          />
                        </td>
                        <td>{prod.title.toUpperCase()}</td>
                        <td>
                          <div>{getPrice(prod.code)}</div>
                        </td>
                      </tr>
                    ))}
                  </table>
                );
              })}
            </div>
          );
        })}
    </form>
  );
}
