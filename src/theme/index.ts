import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const brandRing = {
  ring: 2,
  ringColor: 'brand.500',
};
const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: 'brand.500',
        },
      },
    },
  },
  sizes: {
    md: {
      field: {
        borderRadius: 'none',
      },
    },
  },
};

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: '#f5fee5',
        100: '#e1ffb2',
        200: '#cdf781',
        300: '#b8ee56',
        400: '#a2e032',
        500: '#8ac919',
        600: '#71ab09',
        700: '#578602',
        800: '#3c5e00',
        900: '#203300',
      },
    },
    fonts: {
      heading: `Montserrat, ${base.fonts.heading}`,
      body: `Inter, ${base.fonts.body}`,
    },
    components: {
      Button: {
        variants: {
          primary: (props: any) => {
            return {
              rounded: 'none',
              ...brandRing,
              backgroundColor: mode('brand.500', 'brand.200')(props),
              color: mode('white', 'gray.800')(props),
              _hover: {
                background: mode('brand.600', 'brand.300')(props),
              },
              _active: {
                background: mode('brand.700', 'brand.400')(props),
              },
            };
          },
        },
      },
      Input: inputSelectStyles,
      Select: inputSelectStyles,
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: 0,
            _focus: brandRing,
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Checkbox'],
  }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select'],
  })
);

export default theme;
