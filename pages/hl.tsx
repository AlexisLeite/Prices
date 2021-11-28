import { Center, Heading, Stack } from '@chakra-ui/react';
import * as React from 'react';

interface IHLProps {}

const HL: React.FunctionComponent<IHLProps> = (props) => {
  return (
    <Center>
      <Stack w="210mm" h="297mm" border="1px solid black" m={4}>
        <Heading size="3xl">Highlights</Heading>
      </Stack>
    </Center>
  );
};

export default HL;
