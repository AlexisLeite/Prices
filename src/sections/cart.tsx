import {
  AspectRatio,
  Checkbox,
  Button,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Input,
  Image,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  VStack,
  HStack,
  GridItem,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {}

export default function Cart({}: Props): ReactElement {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start" bg={bgColor}>
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your cart</Heading>
        <Text>
          If the price is too hard on your eyes,{' '}
          <Button variant="link" colorScheme="dark" onClick={() => toggleColorMode()}>
            try changing the theme.
          </Button>
        </Text>
      </VStack>
      <HStack w="full" spacing="6" alignItems="center">
        <AspectRatio ratio={1} w={24}>
          <Image src="https://picsum.photos/200/200" alt="Product preview" />
        </AspectRatio>
        <Stack
          spacing={0}
          alignItems="center"
          w="full"
          direction="row"
          justifyContent="space-between"
        >
          <VStack w="full" spacing={0} alignItems="flex-start">
            <Heading size="md">New article</Heading>
            <Text color={secondaryTextColor}>NWART42135</Text>
          </VStack>
          <Heading size="sm" textAlign="end">
            $119.00
          </Heading>
        </Stack>
      </HStack>
      <VStack spacing="4" alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Subtotal</Text>
          <Heading size="sm">$119.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Shipping</Text>
          <Heading size="sm">$20.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={secondaryTextColor}>Taxes</Text>
          <Heading size="sm">$20.00</Heading>
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={secondaryTextColor}>Total</Text>
        <Heading size="lg">$159.00</Heading>
      </HStack>
    </VStack>
  );
}
