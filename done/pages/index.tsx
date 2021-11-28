import React, { ReactElement } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Details from '../src/sections/details';
import Cart from '../src/sections/cart';

interface Props {}

export default function Index({}: Props): ReactElement {
  return (
    <Container maxW="container.xl" padding={0}>
      <Flex
        h={{ base: 'auto', md: '100vh' }}
        py={{ base: 0, lg: 10, '2xl': 20 }}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Details />
        <Cart />
      </Flex>
    </Container>
  );
}
