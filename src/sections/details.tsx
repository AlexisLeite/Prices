import {
  Checkbox,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {}

export default function Details({}: Props): ReactElement {
  const colspan = useBreakpointValue({ base: 2, md: 1 });
  return (
    <VStack w="full" h="full" p={10} spacing={12} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Your details</Heading>
        <Text>If you already have an account, click here</Text>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colspan}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="John" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colspan}>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Doe" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="G. Sanabria 3525" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colspan}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input placeholder="San Francisco" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colspan}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select>
                <option value="usa">United States</option>
                <option value="uy">Uruguay</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Checkbox defaultChecked>Ship to billing address.</Checkbox>
          </GridItem>
          <GridItem colSpan={2}>
            <Button variant="primary" size="lg" w="full">
              Place order
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
}
