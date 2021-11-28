import React, { ReactElement } from 'react';
import logo from '../logo739x186.png';
import Image from 'next/image';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import download from 'downloadjs';
import NProgress from 'nprogress';
import { useMergedState } from './../src/mergedStatus';

interface Product {
  title: string;
  cost: number;
  image: string;
  code: string;
  link: string;
  copete: string;
  description: string;
  images: string[];
}

function transformProps(props) {
  const aux = { ...props };
  for (let i in aux) {
    if (typeof aux[i] === 'number') aux[i] = aux[i] + 'pt';
  }
  return aux;
}

export function Banner(Banner: Product): ReactElement {
  let [image, setImage] = useMergedState({
    index: 0,
  });
  let [title, setTitle] = useMergedState({
    fontSize: 40,
    paddingTop: 0,
    color: 'yellow',
  });
  let [header, setHeader] = useMergedState({
    fontSize: 40,
    paddingTop: 0,
    color: 'yellow',
  });
  let [controls, setControls] = React.useState({});
  const [showControls, toggleControls] = React.useState(false);

  // Init controls
  React.useEffect(() => {
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        toggleControls(false);
      }
    });
  }, []);
  React.useEffect(() => {
    const newControls: { [key: string]: ReactElement } = {};
    // Set image controls
    if (Banner.images.length > 1) {
      newControls['Change image'] = (
        <button
          onClick={() => {
            const index = image.index + 1 >= Banner.images.length ? 0 : image.index + 1;
            setImage({ index });
          }}
        >
          Image
        </button>
      );
    }

    // Set title controls
    newControls['Title size'] = (
      <button
        onClick={() => {
          let fontSize = title.fontSize + 3;
          if (fontSize > 50) fontSize = 30;
          setTitle({ fontSize, paddingTop: 40 - fontSize });
        }}
      >
        Size
      </button>
    );
    newControls['Title color'] = (
      <div style={{ display: 'inline-block' }}>
        <input
          type="color"
          onChange={(ev) => {
            setTitle({ color: ev.target.value });
          }}
        />{' '}
        {title.color}
      </div>
    );

    // Set header controls
    newControls['Header size'] = (
      <button
        onClick={() => {
          let fontSize = header.fontSize + 3;
          if (fontSize > 50) fontSize = 30;
          setHeader({ fontSize, paddingTop: 40 - fontSize });
        }}
      >
        Size
      </button>
    );
    newControls['Header color'] = (
      <div style={{ display: 'inline-block' }}>
        <input
          type="color"
          onChange={(ev) => {
            setHeader({ color: ev.target.value });
          }}
        />{' '}
        {header.color}
      </div>
    );

    setControls(newControls);
  }, [image, title, header]);

  return (
    <div className="Banner" data-label={Banner.title} id="Banner">
      {showControls && (
        <div
          className="Controls ControlsBox"
          style={{
            background: '#eee',
            zIndex: 600,
            position: 'fixed',
            bottom: 0,
            left: 0,
          }}
        >
          {Object.keys(controls).map((name) => (
            <div>
              {name}: {controls[name]}
            </div>
          ))}
        </div>
      )}
      <div id="Content">
        <button
          className="Controls"
          onClick={() => {
            toggleControls(!showControls);
          }}
          style={{ zIndex: 150, position: 'absolute', top: 0, left: 0 }}
        >
          C
        </button>
        <h3 style={transformProps(header)}>OFERTAS LANZAMIENTO</h3>
        <h1 style={transformProps(title) as any}>{Banner.title}</h1>
        <h2>$ {Math.round((Banner.cost * 1.22 * 1.1 * 45) / 25) * 25}</h2>
        <img src={Banner.images[image.index]} />
      </div>
      <div id="Logo">Huga.uy</div>
    </div>
  );
}

export default function ListBanners() {
  const [banners, setBanners] = React.useState<Product[]>();
  React.useEffect(() => {
    const Fetch = async () => {
      const res = await fetch('http://localhost:3000/index.json');
      const index = await res.json();

      setBanners(index);
    };
    Fetch();
  }, []);

  if (!banners) return <>Loading</>;

  return (
    <div>
      <div id="Controls">
        <button
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 410 }}
          onClick={() => {
            const banners = [...(document.querySelectorAll('.Banner') as any)] as HTMLElement[];
            const zip = new JSZip();

            function dataURLtoFile(dataurl, filename) {
              console.log(typeof dataurl);
              var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new File([u8arr], filename, { type: mime });
            }

            async function makeZip() {
              NProgress.set(0);
              let i = 0;
              for (let banner of banners) {
                NProgress.set(i / banners.length);
                i++;
                (banner.querySelectorAll('.Controls') as any as HTMLElement[]).forEach(
                  (el) => (el.style.display = 'none')
                );
                const title = (banner.dataset.label + '.png').replaceAll('/', '-');
                const png = dataURLtoFile(await toPng(banner), title);

                //Usage example:
                zip.file(title, png);
                (banner.querySelectorAll('.Controls') as any as HTMLElement[]).forEach(
                  (el) => (el.style.display = 'block')
                );
              }
              let zipFile = await zip.generateAsync({ type: 'string' });
              download(zipFile, 'test.zip');
              setTimeout(() => NProgress.set(1), 500);
            }
            makeZip();
          }}
        >
          Download
        </button>
      </div>
      {banners.map((banner) => (
        <Banner {...banner} />
      ))}
    </div>
  );
}
