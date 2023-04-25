import { extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    light: "#F9F5FF",
    dark: "#42307D",
    purple: "#7F56D9",
    deepPurple: "#53389E",
  },
}

const overrides = {
  components: {
    Button: {
      variants: {
        solid: {
          bg: "brand.purple",
          color: "whiteAlpha.900",
          _hover: {
            bg: "brand.deepPurple",
          },
          _active: {
            bg: "brand.purple",
          },
        },
      },
    },
  },
}

const theme = extendTheme({
  colors,
  ...overrides,
})

export default theme
