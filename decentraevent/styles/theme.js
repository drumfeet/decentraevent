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
      baseStyle: {
        _disabled: {
          _hover: {
            color: "black",
          },
        },
      },
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
            bg: "black",
          },
          borderRadius: "0",
          _loading: {
            pointerEvents: "none",
          },
        },
        ghost: {
          _hover: {
            borderColor: "white",
            borderWidth: "1px",
            boxShadow: "4px 4px 0px black",
            bg: "white",
          },
          _loading: {
            pointerEvents: "none",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "0",
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
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
