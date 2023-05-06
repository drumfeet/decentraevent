import { extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    light: "#F9F5FF",
    dark: "#42307D",
    purple: "#7F56D9",
    deepPurple: "#53389E",
  },
  black: {
    border: "#667085",
    text: "#1D2939",
    footer: "#475467",
  },
  yellow: {
    footer: "#FFEDDF",
  },
}

const overrides = {
  components: {
    Button: {
      variants: {
        solid: {
          bg: "black",
          color: "white",
          _hover: {
            borderColor: "white",
            borderWidth: "1px",
            boxShadow: "4px 4px 0px #000000",
            bg: "black",
          },
          _active: {
            bg:"black"
            // bg: "brand.purple",
          },
          borderRadius: "0",
        },
      },
    },
  },
  // fonts: {
  //   heading: `Open Sans, serif`,
  //   body: `Raleway, sans-serif`,
  // },
}

const theme = extendTheme({
  colors,
  ...overrides,
})

export default theme
