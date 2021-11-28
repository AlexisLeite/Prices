import * as React from 'react';
import { updated } from '../src/updatedPrices';
import download from 'downloadjs';
interface IMarkPriceProps {}

interface Product {
  title: string;
  code: string;
  cost: number;
  guarantee: number;
  published?: {
    fb?: boolean;
    ml?: boolean;
    t?: boolean;
  };
}

const MarkPrice: React.FunctionComponent<IMarkPriceProps> = (props) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [sortBy, setSort] = React.useState<keyof Product>('title');
  const [selected, setSelected] = React.useState('0');
  const [results, setResults] = React.useState<Product[]>([]);
  const [showFromJSON, setShowFromJSON] = React.useState(false);

  React.useEffect(() => {
    const storageItems = localStorage.getItem('products');
    storageItems && setProducts(JSON.parse(storageItems));
    document.body.style.backgroundColor = 'black';
  }, []);
  React.useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  products.sort((a, b) => {
    if (typeof a[sortBy] === 'string') {
      return (a[sortBy] as string).toLowerCase() < (b[sortBy] as string).toLowerCase() ? -1 : 1;
    } else return (a[sortBy] as number) - (b[sortBy] as number);
  });

  return (
    <>
      {showFromJSON && (
        <div
          style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: 'black' }}
        >
          <form
            style={{ width: '100%', height: '100%' }}
            action=""
            onSubmit={(ev) => {
              ev.preventDefault();
              try {
                const products = JSON.parse(
                  (ev.target as HTMLElement).querySelector('textarea').value
                );
                setProducts(products);
                setShowFromJSON(false);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <textarea style={{ width: '100%', height: '90%' }} />
            <button
              style={{
                background: 'white',
                color: '#003',
                borderRadius: '3px',
                padding: '3px 10px',
              }}
              type="submit"
            >
              Load
            </button>
          </form>
        </div>
      )}
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const Title = document.getElementById('Title') as HTMLInputElement;
          const title = Title.value;
          const Code = document.getElementById('Code') as HTMLInputElement;
          const code = Code.value;
          const Price = document.getElementById('Price') as HTMLInputElement;
          const cost = Math.round(100 * parseFloat(Price.value)) / 100;
          const Guarantee = document.getElementById('Guarantee') as HTMLInputElement;
          const guarantee = parseInt(Guarantee.value);
          Title.value = '';
          Code.value = '';
          Price.value = '';
          Guarantee.value = '';
          Code.focus();
          setProducts([...products, { title, code, cost, guarantee }]);
        }}
      >
        <style jsx>{`
          @media print {
            * {
              color: black !important;
            }
            form {
              padding: 30px;
            }
            td,
            th {
              border: 1px solid black;
            }
            td:nth-child(4),
            th:nth-child(4),
            td:nth-child(6),
            th:nth-child(6) {
              display: none !important;
            }
            tr:nth-last-child(1),
            tr:nth-last-child(2) {
              display: none !important;
            }
          }
          * {
            font-size: 13pt;
          }
          table {
            border-collapse: collapse;
            width: 100%;
          }

          td,
          th {
            padding: 4px 10px;
          }
          th {
            cursor: pointer;
            width: 60px;
          }
          td {
            color: #bfbfbf;
          }
          input {
            width: 100%;
          }

          thead {
            background: #black;
            color: #bfbfbf;
          }

          tr:nth-child(2n) {
            background: #252222;
          }
          tr:nth-child(2n) a {
          }
          tr:nth-child(2n + 1) {
            background: #090621;
          }
          #Title {
            width: 500px;
          }
          a {
            color: yellow;
            cursor: pointer;
          }

          tr:hover *,
          tr.Selected * {
            background: white;
            color: black !important;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '5px' }}>
          <input
            id="Search"
            type="text"
            onChange={(ev) => {
              const results = updated.filter(
                (prod) => prod.code.toLowerCase() === ev.target.value.toLocaleLowerCase()
              );
              setResults([...results]);
            }}
            onKeyDown={(ev) => {
              console.log(ev.key);
              if (ev.key === 'Enter') {
                ev.preventDefault();
                if (results.length) {
                  console.log(results[0]);
                  setProducts([...products, results[0]]);
                }
              }
              if (ev.key === 'Escape') {
                (ev.target as HTMLInputElement).value = '';
                (ev.target as HTMLElement).focus();
              }
            }}
          />
          <a
            style={{
              background: 'white',
              color: '#003',
              borderRadius: '3px',
              padding: '3px 10px',
              marginRight: '5px',
            }}
            onClick={(ev) => {
              ev.preventDefault();
              setShowFromJSON(true);
            }}
            href="#"
          >
            Cargar
          </a>
          <a
            style={{
              background: 'white',
              color: '#003',
              borderRadius: '3px',
              padding: '3px 10px',
              marginRight: '5px',
            }}
            onClick={(ev) => {
              ev.preventDefault();
              download(JSON.stringify(products), 'products.json');
            }}
            href="#"
          >
            Descargar
          </a>
        </div>
        {results.length > 0 && (
          <div
            style={{
              position: 'fixed',
              top: '40px',
              background: '#003',
              color: 'white',
              width: '100vw',
            }}
          >
            {results.map((result) => (
              <div
                style={{ color: 'white' }}
                key={result.code as any}
                onClick={() => {
                  setProducts([...products, result]);
                  document.getElementById('Search').focus();
                }}
              >
                {result.title}
              </div>
            ))}
          </div>
        )}
        <div style={{ maxHeight: '90vh', overflow: 'auto' }}>
          <table>
            <thead>
              <th onClick={() => setSort('code')}>Code</th>
              <th onClick={() => setSort('title')}>Title</th>
              <th onClick={() => setSort('guarantee')}>Guarantee</th>
              <th onClick={() => setSort('cost')}>Price</th>
              <th>Sell price</th>
              <th onClick={() => setSort('cost')}>Gain</th>
              <th>Published</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className={product.code === selected ? 'Selected' : undefined}
                  key={product.code}
                  onClick={() => {
                    setSelected(product.code);
                  }}
                >
                  <td style={{ whiteSpace: 'nowrap' }}>{product.code}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{product.title}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {/* <input
                  type="text"
                  id="Guarantee"
                  onChange={(ev) =>
                    setProducts(
                      products.map((search) => {
                        if (search.code === product.code)
                          search.guarantee = parseInt(ev.target.value);
                        return { ...search };
                      })
                    )
                  }
                  value={product.guarantee}
                /> */}
                    {product.guarantee}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>U$s {product.cost}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    $ {Math.ceil((product.cost * 1.22 * 1.25 * 45) / 25) * 25}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    $ {Math.ceil((product.cost * 1.22 * 0.25 * 45) / 25) * 25}
                  </td>
                  <td style={{ width: '150px', whiteSpace: 'nowrap' }}>
                    <label style={{ whiteSpace: 'nowrap', width: '70px', display: 'inline-block' }}>
                      <input
                        style={{ margin: 0, width: '20px' }}
                        type="checkbox"
                        checked={product.published?.ml}
                        onChange={(ev) => {
                          setProducts(
                            products.filter((search) => {
                              if (product.code === search.code)
                                search.published = {
                                  ml: ev.target.checked,
                                  fb: search.published?.fb,
                                  t: search.published?.t,
                                };
                              return search;
                            })
                          );
                        }}
                      />
                      ML
                    </label>
                    <label style={{ whiteSpace: 'nowrap', width: '70px', display: 'inline-block' }}>
                      <input
                        style={{ margin: 0, width: '20px' }}
                        type="checkbox"
                        checked={product.published?.fb}
                        onChange={(ev) => {
                          setProducts(
                            products.filter((search) => {
                              if (product.code === search.code)
                                search.published = {
                                  ml: search.published?.ml,
                                  fb: ev.target.checked,
                                  t: search.published?.t,
                                };
                              return search;
                            })
                          );
                        }}
                      />
                      F
                    </label>
                    <label style={{ whiteSpace: 'nowrap', width: '70px', display: 'inline-block' }}>
                      <input
                        style={{ margin: 0, width: '20px' }}
                        type="checkbox"
                        checked={product.published?.t}
                        onChange={(ev) => {
                          setProducts(
                            products.filter((search) => {
                              if (product.code === search.code)
                                search.published = {
                                  ml: search.published?.ml,
                                  fb: search.published?.fb,
                                  t: ev.target.checked,
                                };
                              return search;
                            })
                          );
                        }}
                      />
                      T
                    </label>
                  </td>
                  <td>
                    <a
                      onClick={(ev) => {
                        ev.preventDefault();
                        setProducts(products.filter((search) => search.code !== product.code));
                      }}
                    >
                      Eliminar
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input type="text" id="Code" placeholder="Code" />
                </td>
                <td>
                  <input type="text" id="Title" placeholder="Title" />
                </td>
                <td>
                  <input type="text" id="Guarantee" placeholder="Guarantee" />
                </td>
                <td>
                  <input type="text" id="Price" placeholder="Price" />
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <button type="submit">Agregar producto</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default MarkPrice;
