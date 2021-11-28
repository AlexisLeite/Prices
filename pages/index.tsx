import { Button } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Container, HStack, LinkBox, LinkOverlay } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React from 'react';

interface Product {
  images: string[];
  name: string;
  price: number;
  store: string;
  link: string;
  code: string;
} //Comm

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const printMode = useMediaQuery('media print');

  React.useEffect(() => {
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        const name = document.getElementById('Name') as HTMLInputElement;
        name.scrollIntoView();
        name.value = '';
        name.focus();
      }
    });
  }, []);

  return (
    <Container className="noprint" maxWidth="container.xl">
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const name = (document.getElementById('Name') as HTMLInputElement).value;
          const min = (document.getElementById('Min') as HTMLInputElement).value ?? 0;
          const max = (document.getElementById('Max') as HTMLInputElement).value ?? 8100000;

          const response = await fetch(
            `http://localhost:3000/api/prices/?name=${name}&priceup=${max}&pricedown=${min}`
          );
          const results: Product[] = await response.json();

          setProducts(results.sort((a, b) => a.price - b.price));
        }}
      >
        <HStack>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input type="tel" placeholder="Nombre del producto..." id="Name" />
          </InputGroup>
          <InputGroup w="200px">
            <Input type="tel" placeholder="Mínimo" id="Min" />
          </InputGroup>
          <InputGroup w="200px">
            <Input type="tel" placeholder="Máximo" id="Max" />
          </InputGroup>
          <Button mt={4} colorScheme="purple" type="submit">
            Buscar
          </Button>
        </HStack>
      </form>
      {products.length > 0 && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Imágen</Th>
              <Th>Store</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.length &&
              products.map((product) => (
                <LinkBox as={Tr} key={product.code || product.name}>
                  <Td>
                    <LinkOverlay href={product.link} target="_blank">
                      {product.name}
                    </LinkOverlay>
                  </Td>
                  <Td isNumeric>$ {product.price}</Td>
                  <Td>
                    <Image src={product.images[0]} width="200px" />
                  </Td>
                  <Td>{product.store}</Td>
                </LinkBox>
              ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
}
